# 第5章：拉普拉斯变换

> **本章简介**：拉普拉斯变换是连续时间信号与系统分析的"万能钥匙"——它将微分方程转换为代数方程，将卷积转换为乘法，将复杂的微分-积分运算转化为简单的代数操作。我们从傅里叶变换出发，引入一个衰减因子 $e^{-\sigma t}$，解决了更多函数无法做傅里叶变换的问题，最终建立起完整的 **s 域** 分析框架。本章将掌握拉普拉斯变换的定义、收敛域、零极点分析、微分方程求解，以及系统的 BIBO 稳定性判定。
>
> ⏱ 预估学时：4 小时 | 难度：⭐⭐⭐ | 📍 前置：傅里叶变换（连续时间）、微积分基础

---

## 一、从傅里叶变换到拉普拉斯变换

### 🔍 通俗理解

**傅里叶变换**告诉我们：任何信号都可以分解为一系列正弦和余弦的叠加。但傅里叶变换有一个致命弱点——它要求信号必须**绝对可积**，即 $\int_{-\infty}^{\infty}|x(t)|dt < \infty$。像单位阶跃函数 $u(t)$、线性增长函数 $t \cdot u(t)$ 这些"不衰减"的信号，压根做不了傅里叶变换。

拉普拉斯变换的解决思路是：**在信号身上"绑一个降落伞"**。给信号乘上一个衰减因子 $e^{-\sigma t}$，其中 $\sigma$ 是一个实数。如果信号增长得不太快（多项式级别），总能找到合适的 $\sigma$ 使 $e^{-\sigma t}x(t)$ 收敛到可积。

> 🎯 **生活类比**：想象你站在一条湍急的河流（信号的"增长趋势"）旁边，想要安全地测量水流的特性。如果你跳进河里（直接做傅里叶变换），激流会把你冲走——信号增长太快导致积分发散。但如果你系上安全绳（乘以 $e^{-\sigma t}$），给自己一个恒定的"拉力"拉住，激流就变得可以测量了。不同的 $\sigma$ 对应不同的绳索强度，你总能找到刚好够用的那个。

---

<details class="def-box" open>
<summary>📖 定义 1：拉普拉斯变换（Laplace Transform）</summary>

对于连续时间信号 $x(t)$，其**双边拉普拉斯变换**定义为：

$$X(s) = \int_{-\infty}^{\infty} x(t) e^{-st} \, dt$$

其中 $s = \sigma + j\omega$ 是一个**复频率变量**（$j$ 为虚数单位，与工程中常用 $i$ 等价）。

- 当 $\sigma = 0$ 时，$s = j\omega$，拉普拉斯变换退化为傅里叶变换
- 复变量 $s$ 的实部 $\sigma$ 控制衰减速率
- 复变量 $s$ 的虚部 $\omega$ 控制振荡频率

**收敛条件**：存在实数 $\sigma_c$ 使得当 $\text{Re}(s) = \sigma > \sigma_c$ 时，积分绝对收敛。

</details>

<details class="def-box" open>
<summary>📖 定义 2：收敛域（Region of Convergence, ROC）</summary>

使积分 $X(s) = \int_{-\infty}^{\infty} x(t)e^{-st}dt$ 收敛的 **s 平面区域**，称为收敛域。

- **右边序列**（因果信号，$t \geq 0$ 有非零值）：ROC 是 $\text{Re}(s) > \sigma_{\max}$（s 平面右半平面的一条平行虚轴的半平面）
- **左边序列**（反因果信号，$t \leq 0$ 有非零值）：ROC 是 $\text{Re}(s) < \sigma_{\min}$（s 平面左半平面的一条平行虚轴的半平面）
- **双边序列**：ROC 是 $\sigma_{\min} < \text{Re}(s) < \sigma_{\max}$（s 平面上的一个平行带）

> ⚠️ **注意**：收敛域中**绝不能包含任何极点**。这是判断零极点图正确性的核心约束。

</details>

<details class="proof-box" open>
<summary>📐 推导：常用函数的拉普拉斯变换</summary>

以下给出几个常用函数的拉普拉斯变换证明：

**1. 单位脉冲 $\delta(t)$**

$$X(s) = \int_{-\infty}^{\infty} \delta(t) e^{-st} dt = e^{-s \cdot 0} = 1$$

ROC：整个 s 平面。

**2. 单位阶跃 $u(t)$**

$$X(s) = \int_{0}^{\infty} 1 \cdot e^{-st} dt = \left[ \frac{e^{-st}}{-s} \right]_{0}^{\infty} = \frac{1}{s}, \quad \text{Re}(s) > 0$$

**3. 指数衰减 $e^{-at}u(t)$**

$$X(s) = \int_{0}^{\infty} e^{-at} e^{-st} dt = \int_{0}^{\infty} e^{-(s+a)t} dt = \frac{1}{s+a}, \quad \text{Re}(s) > -a$$

**4. 幂函数 $t^n u(t)$**

$$X(s) = \int_{0}^{\infty} t^n e^{-st} dt = \frac{n!}{s^{n+1}}, \quad \text{Re}(s) > 0$$

可用分部积分递推证明。

</details>

---

## 二、拉普拉斯变换的基本性质

<details class="def-box" open>
<summary>📖 性质 1：线性（Linearity）</summary>

若 $\mathcal{L}\{x_1(t)\} = X_1(s)$，ROC 为 $R_1$；$\mathcal{L}\{x_2(t)\} = X_2(s)$，ROC 为 $R_2$，则：

$$\mathcal{L}\{a x_1(t) + b x_2(t)\} = a X_1(s) + b X_2(s)$$

ROC 为 $R_1 \cap R_2$（交集，至少包含两者交集区域，极点取两者的并集）。

</details>

<details class="def-box" open>
<summary>📖 性质 2：时移性质（Time Shifting）</summary>

$$\mathcal{L}\{x(t - t_0) u(t - t_0)\} = e^{-st_0} X(s)$$

时域右移 $t_0$ 对应 s 域乘以 $e^{-st_0}$（相位旋转）。

**应用场景**：处理因果系统对延迟输入的响应，比如雷达回波信号处理。

</details>

<details class="def-box" open>
<summary>📖 性质 3：s 域平移（s-Domain Shifting）</summary>

$$\mathcal{L}\{e^{-at} x(t)\} = X(s + a)$$

时域乘以指数衰减/增长因子，对应 s 域平移 $a$ 个单位。

**生活类比**：给信号"上保险"（乘以 $e^{-at}$）让 s 域的"地震仪"（极点）位置整体向左侧移动——原本不稳定的系统（极点在右侧），平移后可能变稳定。

</details>

<details class="def-box" open>
<summary>📖 性质 4：时域微分（Time Differentiation）</summary>

$$\mathcal{L}\left\{\frac{dx(t)}{dt}\right\} = sX(s) - x(0^-)$$

二阶导数：$\mathcal{L}\{x''(t)\} = s^2 X(s) - s x(0^-) - x'(0^-)$

**这是拉普拉斯变换解决微分方程的核心工具**——导数变为乘以 $s$（而非积分变为除以 $s$），初始条件直接加进去。

</details>

<details class="def-box" open>
<summary>📖 性质 5：时域积分（Time Integration）</summary>

$$\mathcal{L}\left\{\int_{-\infty}^{t} x(\tau) d\tau\right\} = \frac{X(s)}{s} + \frac{x^{-1}(0^-)}{s}$$

其中 $x^{-1}(0^-) = \int_{-\infty}^{0^-} x(\tau) d\tau$ 为初始积分值。

</details>

<details class="def-box" open>
<summary>📖 性质 6：卷积定理（Convolution Theorem）</summary>

$$\mathcal{L}\{x(t) * h(t)\} = X(s) \cdot H(s)$$

时域卷积对应 s 域乘法——这意味着：系统的输出 $y(t) = x(t) * h(t)$ 在 s 域就是 $Y(s) = X(s)H(s)$。

**系统函数** $H(s) = Y(s)/X(s)$ 就是系统的"身份证"，它完全由系统本身决定，与输入无关。

</details>

---

## 三、初值定理与终值定理

<details class="def-box" open>
<summary>📖 定理 1：初值定理（Initial Value Theorem）</summary>

若 $x(t)$ 及其导数均可拉普拉斯变换，且 $x(t)$ 在 $t = 0$ 处不包含冲激（奇异）函数，则：

$$x(0^+) = \lim_{s \to \infty} sX(s)$$

**用途**：无需做逆变换，直接从 $X(s)$ 读出信号的初始值。设计控制系统时，特别关注系统启动瞬间的响应。

</details>

<details class="def-box" open>
<summary>📖 定理 2：终值定理（Final Value Theorem）</summary>

若 $\lim_{t \to \infty} x(t)$ 存在（即 $x(t)$ 不会持续振荡或发散），则：

$$x(\infty) = \lim_{s \to 0} sX(s)$$

**前提条件**：$sX(s)$ 在 s 平面的虚轴上（及右半平面）没有极点——这等价于系统是**稳定的**。

> ⚠️ **常见错误**：对正弦信号 $x(t) = \sin(\omega t) u(t)$ 使用终值定理。因为 $\sin(\omega t)$ 不收敛，$sX(s) = \frac{\omega s}{s^2 + \omega^2}$ 在 $s = j\omega$ 有极点（虚轴上），违反前提条件，终值定理**不适用**。

</details>

<details class="proof-box" open>
<summary>📐 推导：初值定理与终值定理</summary>

**初值定理推导**：

利用微分性质：$\mathcal{L}\{x'(t)\} = sX(s) - x(0^-)$

对两边取 $s \to \infty$：

$$\lim_{s \to \infty} \int_{0^-}^{\infty} x'(t) e^{-st} dt = \lim_{s \to \infty} \left[sX(s) - x(0^-)\right]$$

左侧 $s \to \infty$ 时，$e^{-st} \to 0$（对 $t > 0$），故积分上界为 $x(\infty) - x(0^-)$；若 $x(t)$ 无冲激，$x(0^-) = x(0^+)$，整理即得 $x(0^+) = \lim_{s \to \infty} sX(s)$。

**终值定理推导**：

对 $sX(s)$ 取 $s \to 0$：

$$\lim_{s \to 0} sX(s) = \lim_{s \to 0} s \int_{0^-}^{\infty} x(t) e^{-st} dt = \lim_{s \to 0} \int_{0^-}^{\infty} x(t) e^{-st} dt$$

$e^{-st} \approx 1 - st + \cdots$，当 $s \to 0$ 时，上式趋向 $\int_{0^-}^{\infty} x'(t) dt = x(\infty) - x(0^-)$，结合初始条件得 $x(\infty) = \lim_{s \to 0} sX(s)$。

</details>

---

## 四、零极点图与系统分析

### 🔍 直观理解零极点

**极点（Pole）**：$X(s)$ 中使分母为零的 $s$ 值。这些点让 $X(s) \to \infty$——想象信号在这些频率处产生了"共振"或"爆炸"。

**零点（Zero）**：$X(s)$ 中使分子为零的 $s$ 值。这些点让 $X(s) = 0$——信号在这些频率处被"完全吸收"。

> 🎯 **几何直觉**：将 s 平面想象成一个"地形图"，$|X(s)|$ 是海拔高度。**极点**是地形图上的"尖刺"（无穷高峰），**零点**是"凹陷"（深谷或平原）。系统的响应由这些地形特征共同决定。

---

<details class="def-box" open>
<summary>📖 定义：零极点图（Pole-Zero Map）</summary>

在复 s 平面上：

- 用 **×** 标记极点位置
- 用 **○** 标记零点位置
- 标注收敛域（ROC）

```
         jω（虚轴）
          |
     ×    |    ○
          |
    ──────┼──────── σ（实轴）
          |
     ×    |
          |
```

**s 平面的左半平面（LHP, Re(s) < 0）**：衰减区域
**s 平面的右半平面（RHP, Re(s) > 0）**：增长区域
**虚轴（Re(s) = 0）**：临界稳定边界

</details>

<details class="def-box" open>
<summary>📖 定理：BIBO 稳定性（Bounded-Input Bounded-Output Stability）</summary>

对于一个**因果 LTI 系统**，其冲激响应为 $h(t)$，系统函数为 $H(s)$：

**BIBO 稳定的充要条件**：冲激响应绝对可积，即 $\int_{0}^{\infty}|h(t)|dt < \infty$

**等价判定（s 域）**：$H(s)$ 的**所有极点**都位于 s 平面的**左半平面**（严格在虚轴左侧），且收敛域必须包含 **$j\omega$ 轴**（虚轴）。

**物理解释**：极点在左半平面 → $e^{p t}$ 中 $p$ 的实部 $< 0$ → $h(t)$ 随时间指数衰减 → 任何有界输入的响应最终都会衰减到零 → 系统稳定。

| 极点位置 | 时域行为 | 稳定性 |
|---------|---------|--------|
| 左半平面（Re(s) < 0） | 指数衰减 | ✅ 稳定 |
| 虚轴单极点（Re(s) = 0）| 恒定振荡 | ⚠️ 临界稳定 |
| 右半平面（Re(s) > 0） | 指数增长 | ❌ 不稳定 |

</details>

---

## 五、拉普拉斯逆变换

<details class="def-box" open>
<summary>📖 方法：部分分式展开法</summary>

大多数工程中遇到的 $X(s)$ 是两个多项式之比 $P(s)/Q(s)$，可通过部分分式展开求解逆变换：

**步骤：**
1. 将 $X(s)$ 写成真分式（分子次数 < 分母次数），必要时做多项式除法
2. 对分母 $Q(s)$ 因式分解，找到所有极点 $p_1, p_2, \ldots, p_n$
3. 对每个极点求留数（Residue）
4. 组合各分项的逆变换

**单实数极点 $p_k$** 的留数：

$$A_k = \lim_{s \to p_k} (s - p_k) X(s)$$

对应项：$A_k e^{p_k t} u(t)$

**共轭复数极点 $p = \sigma + j\omega$**：

$$A = \lim_{s \to p} (s - p) X(s), \quad A^* = \lim_{s \to p^*} (s - p^*) X(s)$$

合并为：$2|A| e^{\sigma t} \cos(\omega t + \angle A) \cdot u(t)$

</details>

<details class="proof-box" open>
<summary>📐 推导：部分分式展开的留数公式</summary>

设 $X(s) = \frac{P(s)}{Q(s)}$，$Q(s) = (s - p_1)(s - p_2)\cdots(s - p_n)$，各 $p_k$ 互不相同。

展开为：$X(s) = \sum_{k=1}^{n} \frac{A_k}{s - p_k}$

两边乘以 $(s - p_k)$ 后令 $s \to p_k$：

$$A_k = \lim_{s \to p_k} (s - p_k) X(s) = \frac{P(p_k)}{Q'(p_k)}$$

逆变换：$\mathcal{L}^{-1}\left\{\frac{1}{s - p_k}\right\} = e^{p_k t} u(t)$，故：

$$x(t) = \sum_{k=1}^{n} A_k e^{p_k t} u(t)$$

若 $p_k = \alpha + j\omega$ 为复数，则 $A_k$ 也是复数，且 $A_{k+1} = A_k^*$（共轭），两者合并给出实数正弦/余弦项。

</details>

---

## 六、用拉普拉斯变换求解微分方程

### 🔍 解微分方程的"三步走"

**核心思想**：微分方程在时域是"hard 模式"，在 s 域变成"easy 模式"——微积分变加减，乘除变卷积。

**三步法**：
1. **变换**：对微分方程两边取拉普拉斯变换，用微分性质消掉导数
2. **代数**：整理得到 $Y(s) = \cdots$，即 $Y(s)$ 的代数表达式
3. **逆变换**：部分分式展开，求 $y(t)$

---

<details class="example-box" open>
<summary>📝 例题：RLC 电路微分方程</summary>

**题目**：求解系统 $y''(t) + 3y'(t) + 2y(t) = x(t)$，初始条件 $y(0^-) = 1$，$y'(0^-) = 2$，输入 $x(t) = e^{-3t} u(t)$。

**解答：**

**第一步：拉普拉斯变换**

$$\mathcal{L}\{y''(t)\} + 3\mathcal{L}\{y'(t)\} + 2\mathcal{L}\{y(t)\} = \mathcal{L}\{x(t)\}$$

$$[s^2 Y(s) - sy(0^-) - y'(0^-)] + 3[sY(s) - y(0^-)] + 2Y(s) = \frac{1}{s+3}$$

代入初始条件和输入：

$$[s^2 Y(s) - s - 2] + 3[sY(s) - 1] + 2Y(s) = \frac{1}{s+3}$$

**第二步：代数求解**

$$(s^2 + 3s + 2) Y(s) = \frac{1}{s+3} + s + 2 + 3 = \frac{1}{s+3} + s + 5$$

$$Y(s) = \frac{1}{(s+1)(s+2)(s+3)} + \frac{s + 5}{(s+1)(s+2)}$$

**第三步：部分分式展开**

对第一项分解：$\frac{1}{(s+1)(s+2)(s+3)} = \frac{1/2}{s+1} - \frac{1}{s+2} + \frac{1/2}{s+3}$

对第二项分解：$\frac{s+5}{(s+1)(s+2)} = \frac{4}{s+1} - \frac{3}{s+2}$

**逆变换**：

$$y(t) = \left[\frac{1}{2}e^{-t} - e^{-2t} + \frac{1}{2}e^{-3t} + 4e^{-t} - 3e^{-2t}\right] u(t)$$

$$= \left[\frac{9}{2}e^{-t} - 4e^{-2t} + \frac{1}{2}e^{-3t}\right] u(t)$$

</details>

---

## 七、系统函数与频率响应

<details class="def-box" open>
<summary>📖 定义：系统函数 H(s)</summary>

对 LTI 系统，其冲激响应 $h(t)$ 的拉普拉斯变换定义为**系统函数**：

$$H(s) = \mathcal{L}\{h(t)\} = \int_{0^-}^{\infty} h(t) e^{-st} dt$$

**输入-输出关系**（s 域）：$Y(s) = H(s) X(s)$，即 $H(s) = Y(s)/X(s)$

**物理意义**：$H(s)$ 是系统在 s 域的"传递函数"，它包含了系统的全部特性（稳定性、因果性、频率选择性等）。

</details>

<details class="def-box" open>
<summary>📖 频率响应与 H(jω) 的几何推导</summary>

**频率响应**是系统对正弦稳态输入的响应。将 $s = j\omega$ 代入 $H(s)$ 得到：

$$H(j\omega) = H(s)\big|_{s=j\omega}$$

**几何解释（向量法）**：

对于 $H(j\omega) = \frac{\prod_{m=1}^{M}(j\omega - z_m)}{\prod_{n=1}^{N}(j\omega - p_n)}$：

- $|H(j\omega)| = \frac{\prod_{m} |j\omega - z_m|}{\prod_{n} |j\omega - p_n|}$ — 零点矢量长度之积除以极点矢量长度之积
- $\angle H(j\omega) = \sum_m \angle(j\omega - z_m) - \sum_n \angle(j\omega - p_n)$ — 零点相位之和减去极点相位之和

**当 $\omega$ 扫描整个频率轴时，这些向量的端点沿着 s 平面的虚轴移动**，从而描绘出系统的频率响应曲线。这就是"几何作图法"求伯德图（Bode Plot）的理论基础。

</details>

---

## 八、Python 代码实现

```python
import numpy as np
import matplotlib.pyplot as plt
from sympy import laplace_transform, inverse_laplace_transform, symbols, exp, Function, dsolve

# ============================================================
# 示例 1：常用信号的拉普拉斯变换
# ============================================================
t = symbols('t', positive=True)
s = symbols('s')

# 常见信号的拉普拉斯变换对照表
signals = {
    'delta(t)': delta_t := 1,  # 冲激
    'u(t)': 1/s,                # 单位阶跃
    'e^{-at}u(t)': 1/(s + 3),  # 指数衰减（a=3）
    't * u(t)': 1/s**2,         # 斜坡函数
    'sin(ωt)u(t)': 2/(s**2 + 4),  # 正弦（ω=2）
}

print("常用拉普拉斯变换对照：")
for name, transform in signals.items():
    print(f"  {name:25s}  ⟺  {transform}")

# ============================================================
# 示例 2：绘制零极点图
# ============================================================
def plot_pole_zero(poles, zeros, roc=None, title="Pole-Zero Map"):
    """绘制零极点图"""
    fig, ax = plt.subplots(figsize=(7, 6))

    # 收敛域
    if roc:
        ax.fill(roc[0], roc[1], alpha=0.15, color='blue', label='ROC')

    # 极点（×）
    if poles:
        ax.scatter(np.real(poles), np.imag(poles),
                   marker='x', s=200, c='red', linewidths=3, label='Poles')

    # 零点（○）
    if zeros:
        ax.scatter(np.real(zeros), np.imag(zeros),
                   marker='o', s=150, c='blue', facecolors='none',
                   linewidths=2, label='Zeros')

    # 虚轴（jw轴）
    ax.axhline(0, color='black', linewidth=1)
    ax.axvline(0, color='black', linewidth=1)

    ax.set_xlabel('σ (Real)', fontsize=12)
    ax.set_ylabel('jω (Imaginary)', fontsize=12)
    ax.set_title(title, fontsize=14)
    ax.legend()
    ax.grid(True, alpha=0.3)
    ax.set_aspect('equal')
    plt.tight_layout()
    plt.savefig('/workspace/ch5_pole_zero.png', dpi=150)
    plt.close()
    print("零极点图已保存到 /workspace/ch5_pole_zero.png")

# 绘制 H(s) = (s+1) / [(s+2)(s^2+2s+2)] 的零极点图
poles = [-2, -1+1j, -1-1j]
zeros = [-1]
plot_pole_zero(poles, zeros,
               roc=([plt.Rectangle((-3, -5), 6, 10, fill=False)], None),
               title=r"$H(s) = \frac{s+1}{(s+2)(s^2+2s+2)}$")

# ============================================================
# 示例 3：初值定理与终值定理验证
# ============================================================
# 例：X(s) = 1/(s+2)，对应 x(t) = e^{-2t}u(t)
# 初值：x(0+) = lim_{s→∞} s/(s+2) = 1
# 终值：x(∞) = lim_{s→0} s/(s+2) = 0
from sympy import limit, S

x0 = limit(s/(s+2) * s, s, float('inf'))
xf = limit(s/(s+2) * s, s, 0)
print(f"\nX(s) = 1/(s+2):")
print(f"  初值定理：x(0+) = {x0} (正确值: 1)")
print(f"  终值定理：x(∞) = {xf} (正确值: 0)")

# ============================================================
# 示例 4：用拉普拉斯变换解微分方程
# ============================================================
y = Function('y')
t = symbols('t')

# 解 y''(t) + 3y'(t) + 2y(t) = e^{-3t}, y(0)=1, y'(0)=2
# 使用 sympy 验证
# 等价于求解
from sympy import Heaviside
eq = y(t).diff(t, 2) + 3*y(t).diff(t) + 2*y(t) - exp(-3*t)*Heaviside(t)
# 这里用解析方式展示
print("\n微分方程 y'' + 3y' + 2y = e^{-3t}u(t) 的解：")
print("  y(t) = [9/2·e^{-t} - 4·e^{-2t} + 1/2·e^{-3t}]·u(t)")

# ============================================================
# 示例 5：频率响应的几何作图
# ============================================================
def H_s(s):
    """系统函数 H(s) = (s+1) / [(s+2)(s^2+2s+2)]"""
    return (s + 1) / ((s + 2) * (s**2 + 2*s + 2))

omega = np.logspace(-2, 2, 1000)  # 0.01 到 100 rad/s
H_jw = H_s(1j * omega)
mag = np.abs(H_jw)
phase = np.angle(H_jw, deg=True)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 7))
ax1.semilogx(omega, 20*np.log10(mag + 1e-12))
ax1.set_ylabel('|H(jω)| (dB)', fontsize=12)
ax1.set_title(r"幅频响应 $H(s) = \frac{s+1}{(s+2)(s^2+2s+2)}$", fontsize=13)
ax1.grid(True, which='both', alpha=0.3)
ax2.semilogx(omega, phase)
ax2.set_xlabel('ω (rad/s)', fontsize=12)
ax2.set_ylabel('∠H(jω) (deg)', fontsize=12)
ax2.grid(True, which='both', alpha=0.3)
plt.tight_layout()
plt.savefig('/workspace/ch5_frequency_response.png', dpi=150)
plt.close()
print("频率响应图已保存到 /workspace/ch5_frequency_response.png")
```

---

## 🎯 章节练习

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 求 $x(t) = e^{-2t}\cos(3t)u(t)$ 的拉普拉斯变换及其 ROC |
| 2 | 分析题 | ⭐⭐⭐ | 判断 $H(s) = \frac{s^2+1}{s^3+2s^2-s-2}$ 的因果性和 BIBO 稳定性 |
| 3 | 计算题 | ⭐⭐ | 用初值定理和终值定理求 $X(s) = \frac{5}{s(s+3)}$ 对应的 $x(0^+)$ 和 $x(\infty)$ |
| 4 | 证明题 | ⭐⭐⭐ | 证明 $X(s) = \frac{2s^2+3s+1}{(s+1)(s^2+4)}$ 的逆变换，并给出时域表达式 |
| 5 | 综合题 | ⭐⭐⭐⭐ | 已知 LTI 系统微分方程 $y''+4y'+4y = x(t)$，求系统函数 $H(s)$，判断稳定性，求冲激响应 $h(t)$，并绘制零极点图 |

---

## 🚀 学科总结

本章建立了 **s 域** 这一强大的分析工具。拉普拉斯变换将微分方程变为代数方程，将卷积变为乘法，将复杂的系统分析变成零极点的几何问题。核心结论：

- **收敛域（ROC）** 是拉普拉斯变换的灵魂——不知道 ROC，零极点图就没有意义
- **BIBO 稳定** ⇔ 所有极点在左半平面（因果系统）
- **初值/终值定理** 让你不用做完整逆变换就能读出关键信息
- **系统函数 $H(s)$** 完全刻画了 LTI 系统的所有特性

下一章，我们将同样的思想"离散化"——引入 **Z 变换**，处理离散时间信号与系统。
