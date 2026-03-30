# 第6章：Z 变换与离散系统深度分析

> **本章简介**：如果说拉普拉斯变换是连续时间系统的"万能钥匙"，那么 **Z 变换**就是离散时间系统的对应版本——它是离散信号与系统在 z 域（复平面上的单位圆周边）进行代数分析的强大工具。本章从 Z 变换的定义出发，系统学习收敛域与序列类型的关系、基本性质（线性、时移、卷积、初值/终值定理）、Z 逆变换方法，以及系统函数 $H(z)$ 与频率响应的深层联系。重点掌握 IIR 与 FIR 系统的本质区别，以及 **Z 域稳定性判定**（所有极点在单位圆内）。
>
> ⏱ 预估学时：4 小时 | 难度：⭐⭐⭐ | 📍 前置：拉普拉斯变换（第5章）、离散时间信号基础

---

## 一、Z 变换的定义与意义

### 🔍 从离散时间傅里叶变换（DTFT）到 Z 变换

回忆离散时间傅里叶变换（DTFT）的定义：

$$X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n] e^{-j\omega n}$$

DTFT 要求序列绝对可和 $\sum |x[n]| < \infty$。像序列 $x[n] = a^n u[n]$（$|a| < 1$ 时可和，但 $|a| \geq 1$ 时发散），很多情况下 DTFT 不存在。

Z 变换的思路：引入复变量 $z$，令 $z = r e^{j\omega}$，则 $z^{-n} = r^{-n} e^{-j\omega n}$：

$$X(z) = \sum_{n=-\infty}^{\infty} x[n] z^{-n}$$

当 $r = 1$（即 $z = e^{j\omega}$）时，Z 变换退化为 DTFT。$r$ 的作用类似拉普拉斯变换中的 $\sigma$——控制序列的衰减速度。

> 🎯 **生活类比**：想象你在用渔网（$z^{-n}$）捕捞水中的鱼群（$x[n]$ 的各时刻样本）。渔网的孔洞形状（由 $z$ 的模长 $r$ 决定）决定了你捕到哪些鱼——$r$ 小（靠近圆心）捕小鱼（高频），$r$ 大（远离圆心）捕大鱼（低频）。**单位圆**（$r=1$）就是你的标准渔网（DTFT）。

---

<details class="def-box" open>
<summary>📖 定义 1：Z 变换（Z-Transform）</summary>

对于离散时间序列 $x[n]$，其**双边 Z 变换**定义为：

$$X(z) = \sum_{n=-\infty}^{\infty} x[n] z^{-n}$$

其中 $z$ 是复变量。工程中通常使用 $z^{-1}$ 作为延迟算子：

$$X(z) = \mathcal{Z}\{x[n]\}$$

**单边 Z 变换**（工程中更常用，因果系统默认）：

$$X(z) = \sum_{n=0}^{\infty} x[n] z^{-n}$$

</details>

<details class="def-box" open>
<summary>📖 定义 2：Z 变换与离散时间拉普拉斯变换的关系</summary>

对离散序列 $x[n]$，先做零阶保持（Zero-Order Hold），得到连续时间信号 $\tilde{x}(t)$，再取拉普拉斯变换，最后令 $z = e^{sT}$（$T$ 为采样周期）：

$$X(z)\big|_{z=e^{sT}} = \mathcal{Z}\{x[n]\} \quad \Longleftrightarrow \quad X(s) = \frac{1 - e^{-sT}}{s} \cdot X^*(s)$$

**核心映射关系**：

| s 平面 | z 平面 |
|--------|--------|
| 虚轴 $s = j\omega$ | 单位圆 $z = e^{j\omega T}$ |
| 左半平面 $\sigma < 0$ | 单位圆内 $\|z\| < 1$ |
| 右半平面 $\sigma > 0$ | 单位圆外 $\|z\| > 1$ |
| $s = 0$ | $z = 1$ |

> ⚠️ **关键映射**：$s$ 平面的虚轴映射为 $z$ 平面的**单位圆**！这意味着离散系统的频率响应就是 $H(z)$ 在单位圆上的取值（$z = e^{j\omega}$）。

</details>

---

## 二、收敛域与序列类型

### 🔍 直观理解 ROC

**收敛域（ROC）**是使无穷级数 $\sum x[n]z^{-n}$ 收敛的所有 $z$ 值的集合。判断序列类型的**唯一依据**就是 ROC 的位置。

<details class="def-box" open>
<summary>📖 三种序列的 ROC</summary>

**1. 右边序列（Right-sided Sequence）**：$x[n]$ 在 $n < N_1$ 时为零（通常 $N_1 = 0$，即因果序列）

- $x[n] = a^n u[n]$ 的 ROC：$|z| > |a|$（$z$ 平面单位圆外的一个外部区域）
- 物理意义：序列从某时刻开始存在，$z$ 域上对应**外部**（半径大于最大极点模长的区域）

```
         |z| > |a|  （外部）
    ○○○○○○○○○○○○○○○○○
    ○                 × 极点
    ○○○○○○○○○○○○○○○○○
         |z| = |a|
```

**2. 左边序列（Left-sided Sequence）**：$x[n]$ 在 $n > N_2$ 时为零（通常反因果）

- $x[n] = -a^n u[-n-1]$ 的 ROC：$|z| < |a|$（$z$ 平面单位圆内的一个内部区域）
- 物理意义：序列从某时刻之前存在，$z$ 域上对应**内部**（半径小于最小极点模长的区域）

**3. 双边序列（Two-sided Sequence）**：$x[n]$ 两边均有非零值

- ROC：$|z| \in (|a_{\min}|, |a_{\max}|)$（$z$ 平面上的一个环形区域）
- 物理意义：两边有尾巴的序列，收敛域是一个环带

> **核心判定法则**：ROC 是一个**连通域**（不含极点），且**必定被极点边界限定**。

</details>

<details class="proof-box" open>
<summary>📐 推导：典型序列的 Z 变换与 ROC</summary>

**右边序列** $x[n] = a^n u[n]$（几何级数）：

$$X(z) = \sum_{n=0}^{\infty} a^n z^{-n} = \sum_{n=0}^{\infty} \left(\frac{a}{z}\right)^n = \frac{1}{1 - a z^{-1}} = \frac{z}{z - a}, \quad \left|\frac{a}{z}\right| < 1$$

$$\text{ROC}: |z| > |a|$$

**左边序列** $x[n] = -a^n u[-n-1]$：

$$X(z) = -\sum_{n=-\infty}^{-1} a^n z^{-n} = -\sum_{n=1}^{\infty} \left(\frac{z}{a}\right)^n = \frac{-z/a}{1 - z/a} = \frac{z}{z - a}, \quad |z| < |a|$$

**注意**：同一个 $X(z) = \frac{z}{z-a}$，由于 ROC 不同，代表完全不同的序列！**Z 变换必须结合 ROC 才能唯一确定信号**。

</details>

---

## 三、Z 变换的基本性质

<details class="def-box" open>
<summary>📖 性质 1：线性（Linearity）</summary>

$$\mathcal{Z}\{a x_1[n] + b x_2[n]\} = a X_1(z) + b X_2(z)$$

ROC 为 $R_1 \cap R_2$。**加法时极点合并（取并集），零点任意**。

</details>

<details class="def-box" open>
<summary>📖 性质 2：时移性质（Time Shifting）</summary>

**右移**（延迟 $k$ 个样本）：

$$\mathcal{Z}\{x[n - k]\} = z^{-k} X(z)$$

（$k > 0$，且需考虑 ROC 是否包含 $\infty$）

**左移**（提前 $k$ 个样本）：

$$\mathcal{Z}\{x[n + k]\} = z^{k} \left[X(z) - \sum_{n=0}^{k-1} x[n] z^{-n}\right]$$

> ⚠️ **关键应用**：差分方程中，$z^{-1}$ 就是"延迟一个采样周期"的算子——这是数字滤波器实现的基础（直接形式、级联形式、并联形式等）。

</details>

<details class="def-box" open>
<summary>📖 性质 3：z 域尺度（z-Domain Scaling）</summary>

$$\mathcal{Z}\{a^n x[n]\} = X\left(\frac{z}{a}\right)$$

时域乘以指数序列（调制）对应 z 域的**缩放**（压缩或拉伸 ROC）。

</details>

<details class="def-box" open>
<summary>📖 性质 4：时域反转（Time Reversal）</summary>

$$\mathcal{Z}\{x[-n]\} = X\left(\frac{1}{z}\right)$$

ROC 也被反转（$|z| \to 1/|z|$）。

</details>

<details class="def-box" open>
<summary>📖 性质 5：卷积定理（Convolution）</summary>

$$\mathcal{Z}\{x[n] * h[n]\} = X(z) \cdot H(z)$$

**这是数字滤波器设计的核心工具**。系统的输出 = 输入与系统单位脉冲响应的卷积，在 z 域就是简单的乘法。

</details>

<details class="def-box" open>
<summary>📖 性质 6：初值定理与终值定理</summary>

**初值定理**（适用于因果序列）：

$$x[0] = \lim_{z \to \infty} X(z)$$

**终值定理**（要求 $(z-1)X(z)$ 的 ROC 包含单位圆）：

$$x[\infty] = \lim_{z \to 1} (z - 1) X(z) = \lim_{z \to 1} \frac{z - 1}{z} X(z)$$

</details>

---

## 四、Z 逆变换

<details class="def-box" open>
<summary>📖 方法 1：部分分式展开法（长除法求原序列）</summary>

**步骤：**
1. 将 $X(z)$ 写成关于 $z^{-1}$ 的幂级数形式 $X(z) = \cdots + x[-2]z^{2} + x[-1]z^{1} + x[0] + x[1]z^{-1} + x[2]z^{-2} + \cdots$
2. 若 $X(z)$ 是 $z^{-1}$ 的有理函数，用部分分式展开得到若干 $\frac{A}{1 - az^{-1}}$ 形式之和
3. 查表或逐项展开：$\frac{1}{1 - az^{-1}} = \sum_{n=0}^{\infty} a^n z^{-n}$（$|z| > |a|$ 时收敛）

**常用变换对**：

| $X(z)$ | $x[n]$ | ROC |
|--------|--------|-----|
| $\frac{1}{1 - az^{-1}}$ | $a^n u[n]$ | $|z| > |a|$ |
| $\frac{-az^{-1}}{1 - az^{-1}}$ | $-a^n u[n-1]$ | $|z| < |a|$ |
| $\frac{1}{(1 - az^{-1})^2}$ | $(n+1)a^n u[n]$ | $|z| > |a|$ |

</details>

<details class="def-box" open>
<summary>📖 方法 2：长除法（幂级数展开）</summary>

将 $X(z)$ 写成两个多项式之比 $\frac{B(z^{-1})}{A(z^{-1})}$，用**长除法**逐项求出幂级数系数。

**适用场景**：只需要前几项 $x[n]$ 时，或者当部分分式展开过于复杂时。

**注意**：必须首先判断 ROC，决定是按 $z^{-1}$ 正幂（因果）还是 $z$ 正幂（非因果）进行除法。

</details>

<details class="example-box" open>
<summary>📝 例题：部分分式展开求逆变换</summary>

**题目**：求 $X(z) = \frac{z}{z^2 - 3z + 2}$，$|z| > 2$ 对应的序列 $x[n]$。

**解答：**

**第一步：分母因式分解**

$$X(z) = \frac{z}{(z-1)(z-2)}$$

**第二步：部分分式展开**

$$\frac{z}{(z-1)(z-2)} = \frac{A}{z-1} + \frac{B}{z-2}$$

$$A = \lim_{z\to1} (z-1)X(z) = \frac{1}{1-2} = -1$$

$$B = \lim_{z\to2} (z-2)X(z) = \frac{2}{2-1} = 2$$

$$X(z) = \frac{-1}{z-1} + \frac{2}{z-2} = \frac{-z^{-1}}{1 - z^{-1}} + \frac{2z^{-1}}{1 - 2z^{-1}}$$

**第三步：查表得逆变换**（ROC 为 $|z| > 2$，对应右边序列）

$$x[n] = -(-1)^n u[n-1] + 2 \cdot (2)^n u[n-1]$$

或者写成 $n \geq 1$ 的形式：

$$x[n] = \left[2^{n+1} - (-1)^{n+1}\right] u[n-1]$$

</details>

---

## 五、系统函数与频率响应

### 🔍 从 H(z) 到频率响应

**系统函数** $H(z)$ 是 LTI 离散系统冲激响应 $h[n]$ 的 Z 变换：

$$H(z) = \mathcal{Z}\{h[n]\} = \sum_{n=-\infty}^{\infty} h[n] z^{-n}$$

**输入-输出关系**（z 域）：$Y(z) = H(z) X(z)$，即 $H(z) = Y(z)/X(z)$

**频率响应**是系统在单位圆上的取值：

$$H(e^{j\omega}) = H(z)\big|_{z=e^{j\omega}}$$

> 🎯 **几何直觉**：将 $z$ 看成单位圆上的一个点 $e^{j\omega}$，$H(e^{j\omega})$ 就是**从所有极点指向 $e^{j\omega}$ 的向量之积**除以**从所有零点指向 $e^{j\omega}$ 的向量之积**。当 $\omega$ 变化时，这个比值的模和相位随之变化，形成滤波器的频率响应曲线。

---

<details class="def-box" open>
<summary>📖 定义：系统函数的零极点形式</summary>

$$H(z) = \frac{\sum_{m=0}^{M} b_m z^{-m}}{\sum_{n=0}^{N} a_n z^{-n}} = \frac{b_0}{a_0} \cdot \frac{\prod_{m=1}^{M}(1 - z_m z^{-1})}{\prod_{n=1}^{N}(1 - p_n z^{-1})}$$

其中 $z_m$ 是零点，$p_n$ 是极点。

**几何频率响应**：

$$|H(e^{j\omega})| = |K| \cdot \frac{\prod_{m} |e^{j\omega} - z_m|}{\prod_{n} |e^{j\omega} - p_n|}$$

$$\angle H(e^{j\omega}) = \angle K + \sum_m \angle(e^{j\omega} - z_m) - \sum_n \angle(e^{j\omega} - p_n)$$

**快速判定法则**：
- 某 $\omega$ 靠近极点 → $|H(e^{j\omega})|$ 大（增益高）
- 某 $\omega$ 靠近零点 → $|H(e^{j\omega})|$ 小（增益低）

</details>

---

## 六、IIR 与 FIR 系统

### 🔍 有没有"记忆"的根本区别

**IIR（Infinite Impulse Response）**：冲激响应**无限长**的系统——系统函数 $H(z)$ 在分母上有非平凡极点（$N \geq 1$）。这类系统有"反馈"，过去的输出会影响当前输出。

**FIR（Finite Impulse Response）**：冲激响应**有限长**的系统——$H(z)$ 的极点全在 $z = 0$ 处（所有反馈抵消，仅有前向路径）。这类系统没有反馈，是纯"抽头延迟线"结构。

> 🎯 **生活类比**：IIR 系统像一个带有回音的房间——你说一句话，声音在墙壁间无限反射，每次反射都变弱一些（但永不停止）。FIR 系统像一个只有直达声的会议室——你的声音直接传出去，没有任何反射。

---

<details class="def-box" open>
<summary>📖 对比：IIR vs FIR 系统</summary>

| 特性 | IIR 系统 | FIR 系统 |
|------|---------|---------|
| 极点位置 | 在 $\|z\| < 1$ 内（可任意位置） | 全在 $z = 0$（分母为 1） |
| 冲激响应 | 无限长（理论上） | 有限长 $h[0..M]$ |
| 计算复杂度 | 低阶即可实现陡峭过渡 | 需要高阶（大量抽头） |
| 稳定性 | 需设计保证（极点在单位圆内） | 天然稳定（$z=0$ 极点在圆心） |
| 相位特性 | 通常非线性相位 | 可设计为线性相位 |
| 设计方法 | 模拟滤波器转换（Butterworth等） | 窗函数法、频率抽样法 |
| 典型应用 | 音频处理（IIR 滤波器） | 图像处理（FIR 滤波）、通信系统 |

**直接形式实现对比**：

```python
# IIR 系统：需要递归计算（当前输出依赖历史输出）
# y[n] = 0.5*y[n-1] + x[n]   # 一阶 IIR

# FIR 系统：纯卷积（当前输出仅依赖当前及过去的输入）
# y[n] = 0.2*x[n] + 0.5*x[n-1] + 0.2*x[n-2]  # 三抽头 FIR
```

</details>

---

## 七、Z 域稳定性判定

<details class="def-box" open>
<summary>📖 定理：Z 域 BIBO 稳定性</summary>

对于离散时间 **LTI 因果系统**，以下命题等价：

1. **时域条件**：$\sum_{n=0}^{\infty} |h[n]| < \infty$（绝对可和）
2. **z 域条件**：$H(z)$ 的所有**极点**都在单位圆**内部**（$|z_p| < 1$），且 ROC 包含单位圆
3. **边界条件**：$H(e^{j\omega})$ 存在且有限（单位圆上无极点）

**物理解释**：极点在单位圆内 → $h[n]$ 中对应项为 $p^n$（$|p| < 1$）→ 指数衰减 → 能量有限 → 稳定。

| 极点位置 | 序列行为 | 稳定性 |
|---------|---------|--------|
| 圆内 $\|z\| < 1$ | 指数衰减 | ✅ 稳定 |
| 单位圆上 $\|z\| = 1$ | 恒定振荡或增长 | ⚠️ 临界（边界振荡） |
| 圆外 $\|z\| > 1$ | 指数增长 | ❌ 不稳定 |

</details>

<details class="def-box" open>
<summary>📖 补充：稳定性与阶跃响应的关系</summary>

**阶跃响应**是系统对 $u[n]$ 的响应 $s[n] = \sum_{k=0}^{n} h[k]$。

**稳定系统的阶跃响应必有界**（因为 $h[n]$ 绝对可和 → $s[n]$ 有界）。

**验证方法**：若系统在单位圆上 $z=1$ 处有极点（一阶极点），则 $\lim_{n\to\infty} s[n]$ 存在（常数）；若为高阶极点，$s[n]$ 无界。

</details>

---

## 八、Python 代码实现

```python
import numpy as np
import matplotlib.pyplot as plt
from sympy import symbols, z, series, Rational, Abs

# ============================================================
# 示例 1：Z 变换的常用性质验证
# ============================================================
print("=== 常用 Z 变换对照表 ===")
print("  δ[n]          ⟺  1           (整个 z 平面)")
print("  u[n]          ⟺  1/(1-z⁻¹)    |z| > 1")
print("  aⁿu[n]        ⟺  1/(1-az⁻¹)   |z| > |a|")
print("  -aⁿu[-n-1]   ⟺  1/(1-az⁻¹)   |z| < |a|")
print("  n·aⁿu[n]     ⟺  az⁻¹/(1-az⁻¹)² |z| > |a|")
print("  cos(nθ)·u[n] ⟺  (1-z⁻¹cosθ)/(1-2z⁻¹cosθ+z⁻²)")

# ============================================================
# 示例 2：绘制零极点图（含 ROC）
# ============================================================
def plot_z_pole_zero(poles, zeros, roc_inner=None, roc_outer=None,
                     title="Pole-Zero Map (z-plane)"):
    """绘制 z 平面零极点图"""
    fig, ax = plt.subplots(figsize=(7, 7))

    # 绘制单位圆
    theta = np.linspace(0, 2*np.pi, 400)
    ax.plot(np.cos(theta), np.sin(theta), 'k-', linewidth=1.5, label='Unit Circle')

    # ROC 填充
    if roc_inner is not None and roc_outer is not None:
        theta_r = np.linspace(0, 2*np.pi, 400)
        ax.fill(np.cos(theta_r)*roc_outer, np.sin(theta_r)*roc_outer,
                np.cos(theta_r)*roc_inner, np.sin(theta_r)*roc_inner,
                alpha=0.15, color='blue', label='ROC')

    # 极点
    if poles:
        ax.scatter(np.real(poles), np.imag(poles),
                    marker='x', s=200, c='red', linewidths=3, zorder=5, label='Poles')

    # 零点
    if zeros:
        ax.scatter(np.real(zeros), np.imag(zeros),
                    marker='o', s=150, c='blue', facecolors='none',
                    linewidths=2, zorder=5, label='Zeros')

    ax.axhline(0, color='gray', linewidth=0.5)
    ax.axvline(0, color='gray', linewidth=0.5)
    ax.set_xlabel('Re(z)', fontsize=12)
    ax.set_ylabel('Im(z)', fontsize=12)
    ax.set_title(title, fontsize=13)
    ax.legend(loc='upper right')
    ax.grid(True, alpha=0.3)
    ax.set_aspect('equal')
    ax.set_xlim(-2.5, 2.5)
    ax.set_ylim(-2.5, 2.5)
    plt.tight_layout()
    plt.savefig('/workspace/ch6_pole_zero_z.png', dpi=150)
    plt.close()
    print("z 平面零极点图已保存到 /workspace/ch6_pole_zero_z.png")

# 例：H(z) = (z-0.5) / [(z-0.7)(z+0.5)]
poles = [0.7, -0.5]
zeros = [0.5]
plot_z_pole_zero(poles, zeros, roc_inner=0.7, roc_outer=2.0,
                 title=r"$H(z)=\frac{z-0.5}{(z-0.7)(z+0.5)}$, ROC: $|z|>0.7$")

# ============================================================
# 示例 3：IIR 与 FIR 系统的冲激响应
# ============================================================
def impulse_response_iir(b, a, N=50):
    """计算 IIR 系统的冲激响应（直接形式 II）"""
    h = np.zeros(N)
    x = np.zeros(N)
    x[0] = 1.0
    for n in range(N):
        # 直接形式 II 递归实现
        h[n] = b[0]*x[n] + sum(b[i]*x[n-i] for i in range(1, len(b)) if n-i >= 0) \
               - sum(a[i]*h[n-i] for i in range(1, len(a)) if n-i >= 0)
        h[n] /= a[0]
    return h

def impulse_response_fir(b, N=50):
    """计算 FIR 系统的冲激响应"""
    h = np.zeros(N)
    h[:len(b)] = b
    return h

# IIR: y[n] - 0.5*y[n-1] = x[n]  →  H(z) = 1/(1-0.5z⁻¹)
b_iir = np.array([1.0])
a_iir = np.array([1.0, -0.5])

# FIR: 5抽头低通 [0.2, 0.2, 0.2, 0.2, 0.2]
b_fir = np.array([0.2, 0.2, 0.2, 0.2, 0.2])

h_iir = impulse_response_iir(b_iir, a_iir, N=50)
h_fir = impulse_response_fir(b_fir, N=50)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 6))
n = np.arange(50)
ax1.stem(n, h_iir, basefmt='k-')
ax1.set_title('IIR: $h[n] = 0.5^n u[n]$ (Infinite Impulse Response)', fontsize=12)
ax1.set_ylabel('$h[n]$')
ax1.grid(True, alpha=0.3)
ax1.set_xlim(-1, 50)

ax2.stem(n, h_fir, basefmt='k-')
ax2.set_title('FIR: $h[n] = 0.2$ for $n=0..4$ (Finite Impulse Response)', fontsize=12)
ax2.set_xlabel('n')
ax2.set_ylabel('$h[n]$')
ax2.grid(True, alpha=0.3)
ax2.set_xlim(-1, 50)

plt.tight_layout()
plt.savefig('/workspace/ch6_iir_vs_fir.png', dpi=150)
plt.close()
print("IIR vs FIR 冲激响应图已保存")

# ============================================================
# 示例 4：从 H(z) 计算频率响应
# ============================================================
def frequency_response_z(b, a, N=512):
    """计算离散系统的频率响应 H(e^{jω})"""
    omega = np.linspace(-np.pi, np.pi, N)
    # 用频率响应公式
    z = np.exp(1j * omega)
    # 计算 H(z) = B(z) / A(z)
    num = np.zeros(N, dtype=complex)
    den = np.zeros(N, dtype=complex)
    for k, zk in enumerate(z):
        num[k] = sum(b[m] * zk**(-m) for m in range(len(b)))
        den[k] = sum(a[n] * zk**(-n) for n in range(len(a)))
    H = num / den
    return omega, H

# 例：二阶 IIR 低通（简化Butterworth近似）
b = np.array([0.0675, 0.135, 0.0675])
a = np.array([1.0, 0.1338, 0.3576])

omega, H = frequency_response_z(b, a)
mag = np.abs(H)
phase = np.angle(H, deg=True)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 7))
ax1.plot(omega/np.pi, 20*np.log10(mag + 1e-12))
ax1.set_ylabel('$|H(e^{j\omega})|$ (dB)', fontsize=12)
ax1.set_title('Frequency Response of IIR Lowpass Filter', fontsize=13)
ax1.grid(True, alpha=0.3)
ax1.set_xlim(-1, 1)
ax2.plot(omega/np.pi, phase)
ax2.set_xlabel('ω/π (normalized frequency)', fontsize=12)
ax2.set_ylabel('∠H (deg)', fontsize=12)
ax2.grid(True, alpha=0.3)
ax2.set_xlim(-1, 1)
plt.tight_layout()
plt.savefig('/workspace/ch6_freq_response.png', dpi=150)
plt.close()
print("频率响应图已保存到 /workspace/ch6_freq_response.png")

# ============================================================
# 示例 5：稳定性检验（朱利稳定性判据）
# ============================================================
def jury_stability(b, a):
    """
    朱利（Jury）稳定性判据
    适用于离散系统系数实数的情况
    """
    n = len(a) - 1  # 分母阶数
    # 构建朱利表
    # 这里仅展示核心判据：所有特征根在单位圆内 <=> b[0] 反号等条件
    roots = np.roots(a)
    inside_unit = np.all(np.abs(roots) < 1)
    return inside_unit, roots

# 检验 H(z) = 1 / (1 - 0.5z⁻¹) 的稳定性
b_test = np.array([1.0])
a_test = np.array([1.0, -0.5])
stable, poles_z = jury_stability(b_test, a_test)
print(f"\nH(z) = 1/(1-0.5z⁻¹):")
print(f"  极点位置: {poles_z}")
print(f"  稳定性: {'稳定 ✅' if stable else '不稳定 ❌'}")

# 检验不稳定系统 H(z) = 1 / (1 - 1.5z⁻¹)
a_unstable = np.array([1.0, -1.5])
stable_u, poles_u = jury_stability(np.array([1.0]), a_unstable)
print(f"\nH(z) = 1/(1-1.5z⁻¹):")
print(f"  极点位置: {poles_u}")
print(f"  稳定性: {'稳定 ✅' if stable_u else '不稳定 ❌'} (|pole| = {abs(poles_u[0]):.2f} > 1)")

# ============================================================
# 示例 6：Z 逆变换（部分分式展开 + 长除法）
# ============================================================
print("\n=== Z 逆变换示例 ===")
print("X(z) = z/(z²-3z+2), ROC: |z|>2")
print("  = 2/(z-2) - 1/(z-1)")
print("  = 2z⁻¹/(1-2z⁻¹) - z⁻¹/(1-z⁻¹)")
print("  x[n] = [2^{n+1} - (-1)^{n+1}]·u[n-1]  (n≥1)")
print("验证：x[1] = 2²-(-1)² = 3, x[2] = 2³-(-1)³ = 9, ...")
```

---

## 🎯 章节练习

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 求 $x[n] = (0.5)^n u[n] - 2(-1)^n u[-n-1]$ 的 Z 变换及 ROC |
| 2 | 分析题 | ⭐⭐⭐ | 判断 $H(z) = \frac{z^2 + z}{z^2 - 0.9z + 0.2}$（因果系统）的 BIBO 稳定性，并绘制零极点图 |
| 3 | 计算题 | ⭐⭐ | 用长除法求 $X(z) = \frac{1}{1 - 0.5z^{-1}}$（$|z| > 0.5$）的前 5 项逆变换 |
| 4 | 证明题 | ⭐⭐⭐ | 证明初值定理 $x[0] = \lim_{z\to\infty} X(z)$，并说明为何终值定理要求 $(z-1)X(z)$ 的 ROC 包含单位圆 |
| 5 | 综合题 | ⭐⭐⭐⭐ | 设计一个三阶 IIR 低通滤波器：用双线性变换法（$T=1$）将模拟原型 $H_a(s) = \frac{1}{s^2+s+1}$ 转换为 $H(z)$，检验稳定性，绘频率响应 |

---

## 🚀 学科总结

本章完成了从连续（拉普拉斯）到离散（Z 变换）的过渡，建立了 z 域分析的统一框架：

- **Z 变换** $X(z) = \sum x[n]z^{-n}$ 是离散系统的"傅里叶-拉普拉斯"工具
- **单位圆映射**：$z = e^{j\omega}$ 建立了 Z 域与 DTFT 的对应关系
- **ROC 决定序列类型**：右边序列看外边，左边序列看里边，双边序列看中间
- **IIR vs FIR**：分母有没有多项式（$N \geq 1$ → IIR；$N = 0$ → FIR）
- **稳定条件**：所有极点在单位圆内（$|z_p| < 1$）

下一章，我们将运用这些工具来**设计真实的滤波器**——从理想到实际，从模拟到数字。
