# 第3章：离散时间信号与线性系统

> **本章简介**：从本章开始，我们从连续世界转向离散世界——这是数字信号处理的基础。离散时间信号 $x[n]$ 是对连续信号采样的结果，单位样值 $\delta[n]$ 是其冲激函数。我们将建立离散时间的 LTI 系统理论：引入**卷积和**这一核心运算，理解差分方程如何描述系统行为，并学习系统函数 $H(z)$ 和频率响应 $H(e^{j\omega})$ 的概念。这些内容是理解数字滤波器、采样定理和 DFT 的前置基础。
>
> ⏱ 预估学时：4 小时 | 难度：⭐⭐⭐ | 📍 前置：第1章、第2章基础

---

## 一、离散时间信号的基本概念

### 🔍 通俗理解

**离散时间信号** $x[n]$ 就像把一段连续播放的音乐"定格"成一帧帧画面——每个画面是一个数值，帧号就是 $n$。它不是"连续的河流"，而是"离散的点序列"。手机处理的音乐、电脑显示的图像，本质上都是离散信号。

> 🎯 **生活类比**：连续信号像是胶片电影（每时每刻都在变化）；离散信号像是数字摄影的帧序列（每秒固定帧数，比如 30fps 或 60fps）。每帧是一个瞬间快照，帧与帧之间没有"过程"。

---

<details class="def-box" open>
<summary>📖 定义 1：离散时间信号 x[n]</summary>

**离散时间信号**（Discrete-Time Signal）定义为：

$$x[n], \quad n \in \mathbb{Z}$$

- $n$ 是**整数索引**（不能用 $t$，只能用 $n$）
- 括号用 **方括号**（与连续信号的圆括号区分）
- 值可以是实数或复数

**与连续信号的关系（采样）**：

若 $x_c(t)$ 是连续时间信号，以采样周期 $T_s$ 采样：

$$x[n] = x_c(nT_s)$$

采样频率：$f_s = \frac{1}{T_s}$（单位：Hz）
归一化频率（数字频率）：$\omega = 2\pi \frac{f}{f_s}$（单位：rad）

**注意**：离散信号 $x[n]$ 的 $n$ 是**无量纲整数**，不是秒。若原连续信号时间单位为秒，则 $n=5$ 对应 $t=5T_s$ 秒。

```python
import numpy as np
import matplotlib.pyplot as plt

# 连续信号
t = np.linspace(0, 4*np.pi, 2000)
x_ct = np.sin(t)

# 离散采样（采样周期 Ts = 0.4，对应每秒约2.5个点）
Ts = 0.4
n = np.arange(0, int(4*np.pi / Ts) + 1)
x_dt = np.sin(n * Ts)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 6))
ax1.plot(t, x_ct, 'b-', alpha=0.6, label='连续信号 x_c(t)')
ax1.stem(n, x_dt, 'r-', label='离散采样 x[n]')
ax1.set_title(f'连续信号及其离散采样 (T_s={Ts})')
ax1.legend(); ax1.grid(True)
ax2.plot(n*Ts, x_dt, 'ro-', markersize=4)
ax2.set_title('离散序列 x[n]（横轴为实际时间 n·Ts）')
ax2.set_xlabel('n (序号)'); ax2.set_ylabel('x[n]'); ax2.grid(True)
plt.tight_layout(); plt.savefig('/workspace/signals_ch3_sampling.png', dpi=120)
print("采样示意图已保存")
```

</details>

---

## 二、离散时间奇异信号

### 🔍 通俗理解

离散世界的"冲激"和"阶跃"与连续世界类似，但有重要区别：离散冲激 $\delta[n]$ 是一个在 $n=0$ 处取值为 1 的单个点，而不是连续冲激的"无限高、无限窄"。离散阶跃 $u[n]$ 是一个从 $n=0$ 开始全为 1 的序列。

---

<details class="def-box" open>
<summary>📖 定义 2：单位样值 δ[n]（Unit Sample）</summary>

**单位样值**（也称单位脉冲、Kronecker delta）定义为：

$$\delta[n] = \begin{cases} 1 & n = 0 \\ 0 & n \neq 0 \end{cases}$$

**筛选特性**（离散版本的冲激筛选）：

$$x[n] = \sum_{k=-\infty}^{\infty} x[k] \, \delta[n - k] = \sum_{k=-\infty}^{\infty} x[k] \, \delta[k - n]$$

这表明：**任意离散序列都可以表示为若干移位单位样值的加权和**。这和连续时间信号 $x(t) = \int x(\tau)\delta(t-\tau)d\tau$ 完全对应。

**应用**：利用此性质求 LTI 系统对任意输入的响应（见后文的卷积和）。

</details>

<details class="def-box" open>
<summary>📖 定义 3：单位阶跃序列 u[n]</summary>

**单位阶跃**定义为：

$$u[n] = \begin{cases} 1 & n \geq 0 \\ 0 & n < 0 \end{cases}$$

**与 $\delta[n]$ 的关系**：

$$u[n] = \sum_{k=0}^{\infty} \delta[n - k] = \sum_{k=-\infty}^{n} \delta[k]$$

$$\delta[n] = u[n] - u[n-1]$$

**因果序列**：形如 $x[n] = 0$ for $n < 0$ 的序列。单位阶跃是因果的。

```python
import numpy as np
import matplotlib.pyplot as plt

n = np.arange(-10, 20)

# 单位样值
delta = np.where(n == 0, 1.0, 0.0)
# 单位阶跃
u = np.where(n >= 0, 1.0, 0.0)
# 移位的阶跃
u_shift = np.where(n >= 3, 1.0, 0.0)

fig, axes = plt.subplots(3, 1, figsize=(10, 8))
axes[0].stem(n, delta, use_line_collection=True)
axes[0].set_title('单位样值 δ[n]'); axes[0].grid(True)
axes[1].stem(n, u, use_line_collection=True)
axes[1].set_title('单位阶跃 u[n]'); axes[1].grid(True)
axes[2].stem(n, u_shift, use_line_collection=True)
axes[2].set_title('移位阶跃 u[n-3]'); axes[2].grid(True)
for ax in axes: ax.set_xlim(-10, 20); ax.set_ylim(-0.2, 1.5)
plt.tight_layout(); plt.savefig('/workspace/signals_ch3_discrete_primitive.png', dpi=120)
print("离散奇异信号图已保存")
```

</details>

---

## 三、基本离散序列

<details class="def-box" open>
<summary>📖 定义 4：常见离散序列</summary>

| 序列名称 | 表达式 | 特点 |
|---|---|---|
| **单位样值** | $\delta[n]$ | 单点非零 |
| **单位阶跃** | $u[n]$ | 从 0 开始全 1 |
| **矩形序列** | $\text{rect}_N[n] = u[n] - u[n-N]$ | N 个 1 后全 0 |
| **正弦序列** | $\sin(\omega_0 n)$ | 振荡，频率 $\omega_0$ |
| **指数序列** | $a^n u[n]$ | 收敛若 $|a|<1$，发散若 $|a|>1$ |
| **复指数序列** | $e^{j\omega_0 n}$ | 模恒为 1 的旋转矢量 |

**正弦/复指数序列的周期性**：若存在整数 $N>0$ 使 $e^{j\omega_0(n+N)} = e^{j\omega_0 n}$，即 $e^{j\omega_0 N} = 1$，则序列周期 $N = \frac{2\pi m}{\omega_0}$，其中 $m$ 为使 $N$ 为整数的最小正整数。

> ⚠️ **重要区别**：连续正弦 $\sin(\omega_0 t)$ **总是**周期信号；但离散正弦 $\sin(\omega_0 n)$ **不一定**是周期的——只有当 $\frac{2\pi}{\omega_0}$ 为有理数时才周期。

</details>

---

## 四、离散时间 LTI 系统与卷积和

这是离散信号与系统最重要的一节！

### 🔍 通俗理解

**卷积和**是离散 LTI 系统的"心脏"。为什么叫"卷积"？可以把 $h[n-k]$ 看作 $h$ 在 $n$ 处的"翻转+平移"，与 $x[k]$ 对应点相乘后累加。这就像把所有过去的输入 $x[k]$ 乘以对应的系统权重 $h[n-k]$ 后叠加，得到当前输出 $y[n]$。

> 🎯 **生活类比**：想象你在织毛衣（卷积和就像"编织"）。$x[k]$ 是每一步输入的纱线颜色，$h[n-k]$ 是织到第 $n$ 步时第 $k$ 步的纱线对当前布面的影响权重。卷积和把所有历史输入按权重叠加，得到最终的图案 $y[n]$。

---

<details class="def-box" open>
<summary>📖 定义 5：卷积和（Convolution Sum）</summary>

设离散 LTI 系统的**单位脉冲响应**为 $h[n] = T\{\delta[n]\}$，则对任意输入 $x[n]$，输出为：

$$y[n] = x[n] * h[n] = \sum_{k=-\infty}^{\infty} x[k] \, h[n - k]$$

**推导**（从筛选特性出发）：
1. 将 $x[n]$ 用 $\delta[n]$ 表示：$x[n] = \sum_{k} x[k]\delta[n-k]$
2. 代入 LTI 系统：$y[n] = T\{x[n]\} = \sum_{k} x[k] T\{\delta[n-k]\}$
3. 利用时不变性：$T\{\delta[n-k]\} = h[n-k]$
4. 得到卷积和：$y[n] = \sum_{k} x[k] h[n-k]$

**物理直觉**：$h[n-k]$ 是系统在 $n-k$ 时刻（相对于当前 $n$ 时刻延迟了 $k$ 个单位）的脉冲响应，即过去输入 $x[k]$ 对当前输出的权重贡献。

**交换律**：$x * h = h * x$，即：

$$y[n] = \sum_{k=-\infty}^{\infty} h[k] \, x[n - k]$$

</details>

<details class="proof-box" open>
<summary>📐 卷积和的计算步骤图解</summary>

计算 $y[n] = x[n] * h[n]$ 的步骤：

**Step 1**：将 $h[k]$ 关于 $k=0$ **翻转**（反转），得到 $h[-k]$
**Step 2**：将 $h[-k]$ **平移** $n$ 个单位，得到 $h[n-k]$（$n>0$ 右移，$n<0$ 左移）
**Step 3**：将 $h[n-k]$ 与 $x[k]$ **相乘**
**Step 4**：对乘积结果在 $k$ 上**求和**（$k$ 从 $-\infty$ 到 $+\infty$）

> 🎯 **图形法理解**：在纸上将 $x[k]$ 和 $h[k]$ 画在同一条 $k$ 轴上。翻转 $h[k]$ 得到 $h[-k]$，然后平移。重叠区域乘积之和即为 $y[n]$ 对该 $n$ 的值。

</details>

```python
import numpy as np
import matplotlib.pyplot as plt

# 两个有限长序列的卷积和
n_x = np.arange(0, 5)  # x[n]: n=0,1,2,3,4
x = np.array([1, 2, 1, 0, 0], dtype=float)

n_h = np.arange(0, 4)  # h[n]: n=0,1,2,3
h = np.array([1, 1, 0.5, 0], dtype=float)

# 直接卷积和
N_y = len(x) + len(h) - 1
y = np.zeros(N_y)
for n in range(N_y):
    for k in range(len(x)):
        if 0 <= n - k < len(h):
            y[n] += x[k] * h[n - k]

n_y = np.arange(0, N_y)

# 用numpy验证
y_np = np.convolve(x, h)

print(f"x[n] = {x}")
print(f"h[n] = {h}")
print(f"y[n] = x*h = {y_np}")

fig, axes = plt.subplots(4, 1, figsize=(12, 10))
axes[0].stem(n_x, x, use_line_collection=True); axes[0].set_title('输入 x[n]')
axes[1].stem(n_h, h, use_line_collection=True); axes[1].set_title('冲激响应 h[n]')
axes[2].stem(n_y, y_np, use_line_collection=True); axes[2].set_title('输出 y[n] = x[n] * h[n]')
axes[3].plot(n_y, y_np, 'bo-'); axes[3].set_title('卷积和（连续表示）')
for ax in axes: ax.grid(True)
plt.tight_layout(); plt.savefig('/workspace/signals_ch3_conv.png', dpi=120)
print("卷积和图像已保存")
```

</details>

---

## 五、离散时间系统的差分方程表示

### 🔍 通俗理解

LTI 连续系统用**微分方程**描述（如 $\frac{dy}{dt} + ay = bx$），LTI 离散系统则用**差分方程**描述（方程中包含序列的延迟项）。差分方程描述的是：当前输出 $y[n]$ 是过去输出 $y[n-1], y[n-2],...$ 和当前/过去输入 $x[n], x[n-1],...$ 的线性组合。

---

<details class="def-box" open>
<summary>📖 定义 6：常系数线性差分方程</summary>

$N$ 阶**常系数线性差分方程**：

$$\sum_{k=0}^{N} a_k \, y[n-k] = \sum_{m=0}^{M} b_m \, x[n-m]$$

或写成更常见的形式：

$$a_0 y[n] + a_1 y[n-1] + \cdots + a_N y[n-N] = b_0 x[n] + b_1 x[n-1] + \cdots + b_M x[n-M]$$

**特点**：
- **线性**：$y[n]$ 和 $x[n]$ 均以一次方出现（无平方、乘积等）
- **常系数**：$a_k, b_m$ 是常数（不随 $n$ 变化）
- **阶数**：$N$ 是输出延迟的最大步数

**求解方法**：
1. **齐次解**：令右端为 0，解特征方程 $\sum_{k=0}^N a_k r^{N-k}=0$
2. **特解**：根据输入形式猜测
3. **初始条件**：确定系数

</details>

---

## 六、系统函数与 z 变换

<details class="def-box" open>
<summary>📖 定义 7：系统函数 H(z)（传递函数）</summary>

对差分方程两边取 **z 变换**（Z-Transform），利用时移性质 $\mathcal{Z}\{x[n-n_0]\}=z^{-n_0}X(z)$，得到：

$$H(z) = \frac{Y(z)}{X(z)} = \frac{\sum_{m=0}^M b_m z^{-m}}{\sum_{k=0}^N a_k z^{-k}} = \frac{b_0 + b_1 z^{-1} + \cdots + b_M z^{-M}}{a_0 + a_1 z^{-1} + \cdots + a_N z^{-N}}$$

**$H(z)$ 的意义**：
- 是冲激响应 $h[n]$ 的 z 变换：$H(z) = \mathcal{Z}\{h[n]\}$
- 在单位圆 $|z|=1$ 上计算即得到**频率响应** $H(e^{j\omega})$
- 零极点分布决定了系统的频率特性

**z 变换定义**：

$$\mathcal{Z}\{x[n]\} = X(z) = \sum_{n=-\infty}^{\infty} x[n] z^{-n}$$

</details>

---

## 七、频率响应

### 🔍 通俗理解

**频率响应** $H(e^{j\omega})$ 描述了离散 LTI 系统对不同频率的输入信号的处理效果——哪些频率被放大、哪些被衰减、哪些被延迟。它是复数，有幅度（$|H(e^{j\omega})|$）和相位（$\angle H(e^{j\omega})$）两部分。

---

<details class="def-box" open>
<summary>📖 定义 8：频率响应 H(e^(jω))</summary>

**频率响应**定义为冲激响应 $h[n]$ 的离散时间傅里叶变换（DTFT，见第4章），这里先给出定义：

$$H(e^{j\omega}) = \sum_{n=-\infty}^{\infty} h[n] e^{-j\omega n}$$

**极坐标形式**：

$$H(e^{j\omega}) = |H(e^{j\omega})| e^{j\phi(\omega)}$$

- $|H(e^{j\omega})|$：**幅度响应**（Magnitude Response），描述对各频率的放大/衰减
- $\phi(\omega) = \angle H(e^{j\omega})$：**相位响应**（Phase Response），描述对各频率的延迟

**物理意义**：对正弦输入 $x[n] = A \cos(\omega_0 n)$，LTI 系统输出为：

$$y[n] = A |H(e^{j\omega_0})| \cos(\omega_0 n + \phi(\omega_0))$$

即：幅度被乘以 $|H(e^{j\omega_0})|$，相位被加上 $\phi(\omega_0)$。

```python
import numpy as np
import matplotlib.pyplot as plt

# 示例：低通 FIR 滤波器的频率响应
n = np.arange(0, 21)
h = np.ones(21) / 21  # 21点滑动平均（简单低通）

omega = np.linspace(-np.pi, np.pi, 1024)
H = np.zeros(len(omega), dtype=complex)
for i, w in enumerate(omega):
    H[i] = np.sum(h * np.exp(-1j * w * n))

mag = np.abs(H)
phase = np.angle(H)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 7))
ax1.plot(omega, mag, 'b-', linewidth=2)
ax1.set_title('幅度响应 |H(e^{jω})|'); ax1.set_xlabel('ω (rad/sample)')
ax1.set_ylabel('|H|'); ax1.grid(True)
ax2.plot(omega, phase, 'r-', linewidth=2)
ax2.set_title('相位响应 ∠H(e^{jω})'); ax2.set_xlabel('ω (rad/sample)')
ax2.set_ylabel('相位 (rad)'); ax2.grid(True)
ax1.set_xlim(-np.pi, np.pi)
ax2.set_xlim(-np.pi, np.pi)
plt.tight_layout(); plt.savefig('/workspace/signals_ch3_freq_resp.png', dpi=120)
print("频率响应图已保存")
```

</details>

---

## 八、LTI 离散系统的分类与性质

<details class="def-box" open>
<summary>📖 定义 9：因果性与稳定性（离散）</summary>

**因果离散 LTI 系统**：系统因果当且仅当

$$h[n] = 0, \quad n < 0$$

即冲激响应只在 $n \geq 0$ 有非零值（**右边序列**）。

**BIBO 稳定离散 LTI 系统**：冲激响应满足

$$\sum_{n=-\infty}^{\infty} |h[n]| < \infty \quad \text{（绝对可和）}$$

**IIR vs FIR**：
- **IIR**（Infinite Impulse Response）：$h[n]$ 无限长（如 $h[n] = a^n u[n],\ |a|<1$）
- **FIR**（Finite Impulse Response）：$h[n]$ 有限长（如滑动平均滤波器）

**FIR 系统必稳定**（有限项和必收敛），但 **IIR 系统可能稳定也可能不稳定**。

</details>

---

## 练习题

1. **（序列运算）** 已知 $x[n] = \{1, 2, 3, 4\}$（$n=0,1,2,3$），求：$y_1[n] = x[-n]$，$y_2[n] = x[2n]$（下采样），$y_3[n] = x[n] \cdot u[n-1]$。

2. **（卷积和计算）** 设 $x[n] = \delta[n] + 2\delta[n-1] + \delta[n-2]$，$h[n] = u[n] - u[n-3]$（长度为 3 的矩形脉冲），用手工计算求 $y[n] = x[n] * h[n]$，并用 Python 验证。

3. **（差分方程求解）** 求解差分方程 $y[n] - 0.5y[n-1] = x[n]$ 的单位脉冲响应 $h[n]$（假设 $y[-1]=0$，系统因果）。

4. **（z 变换）** 求 $h[n] = (0.8)^n u[n]$ 的系统函数 $H(z)$，指出其零极点，并判断系统的因果性和稳定性。

5. **（频率响应）** 已知 $H(z) = \frac{1 - z^{-1}}{1 - 0.5z^{-1}}$，求 $|H(e^{j\omega})|$ 在 $\omega = 0$ 和 $\omega = \pi$ 处的值，并说明系统是低通还是高通特性。

6. **（LTI 系统组合）** 两个因果 LTI 系统的冲激响应分别为 $h_1[n] = \delta[n] + \delta[n-1]$ 和 $h_2[n] = (0.5)^n u[n]$，求级联系统 $h[n] = h_1[n] * h_2[n]$ 的表达式。

---

> 💡 **本章小结**：离散时间信号与系统的核心是**序列**与**差分方程**。三大关键工具是：筛选特性（用 $\delta[n]$ 分解任意序列）、卷积和（求 LTI 系统响应）、z 变换（系统函数与频率响应）。因果性和稳定性是 LTI 离散系统的两个核心约束，IIR/FIR 的区分则对应了不同的系统实现方式。
