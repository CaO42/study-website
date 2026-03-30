# 第1章：信号与系统的基本概念

> **本章简介**：本章是信号与系统的入门篇章。我们从"什么是信号"出发，介绍连续信号与离散信号的表示方法，深入理解奇异信号（单位冲激、阶跃、矩形脉冲）的本质，掌握信号的基本运算（反转、平移、尺度变换），并学习判断周期性与能量/功率信号。最后，系统地分类连续时间系统，理解 LTI 系统的核心特性，为后续章节的傅里叶分析奠定基础。
>
> ⏱ 预估学时：4 小时 | 难度：⭐⭐ | 📍 前置：微积分基础、线性代数入门

---

## 一、信号的定义与分类

### 🔍 通俗理解

**信号**是什么？可以把它想象成一条随时间流动的"信息河流"。河流有高低起伏，水量有多有少——信号同样如此，它随时间变化，携带着我们要传递或处理的信息。声音是信号，温度是信号，股票价格也是信号。任何随时间（或空间）变化的数据，都是信号。

> 🎯 **生活类比**：想象你在听一首歌。音乐的波形就是连续时间信号——它是时间的连续函数；而如果你把音乐转成 MP3 存进手机，MP3 里存储的是一系列采样点，那就是离散时间信号。连续信号像是原始的模拟录音带，离散信号像是录音带的数字拷贝。

---

<details class="def-box" open>
<summary>📖 定义 1：连续时间信号 CT（Continuous-Time Signal）</summary>

**连续时间信号** $x(t)$ 是定义在**连续时间域**上的信号，即时间 $t$ 可以取任意实数值：

$$x(t): \mathbb{R} \rightarrow \mathbb{C} \text{ 或 } \mathbb{R}$$

- 自变量 $t$ 是连续的（取值于实数域 $\mathbb{R}$）
- 函数值也可以是连续的（取任意实数值或复数值）
- 也称为**模拟信号**（Analog Signal）

**常见例子**：
- 语音波形：$x(t) = A\sin(2\pi f t)$
- 热力学温度随时间的变化
- 心电图（ECG）信号

</details>

<details class="def-box" open>
<summary>📖 定义 2：离散时间信号 DT（Discrete-Time Signal）</summary>

**离散时间信号** $x[n]$ 是定义在**离散时间点**上的信号，$n$ 为整数：

$$x[n]: \mathbb{Z} \rightarrow \mathbb{C} \text{ 或 } \mathbb{R}$$

- 自变量 $n$ 是离散的（只能取整数值）
- 通常由连续信号**采样**得到：$x[n] = x_c(nT_s)$，其中 $T_s$ 为采样周期
- 也称为**数字信号**（Digital Signal）

**重要约定**：方括号 $[]$ 表示离散时间索引，圆括号 $()$ 表示连续时间。

```python
import numpy as np
import matplotlib.pyplot as plt

# 连续时间正弦信号
t = np.linspace(0, 1, 1000)  # 1000个连续点
x_ct = np.sin(2 * np.pi * 3 * t)  # 3Hz正弦波

# 离散时间信号（每50个点取1个）
n = np.arange(0, 200)  # n = 0, 1, 2, ..., 199
x_dt = np.sin(2 * np.pi * 3 * n / 50)  # 采样

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
ax1.plot(t, x_ct); ax1.set_title('连续时间信号 x(t)'); ax1.set_xlabel('t')
ax2.stem(n[:30], x_dt[:30]); ax2.set_title('离散时间信号 x[n]'); ax2.set_xlabel('n')
plt.tight_layout(); plt.savefig('/workspace/signals_ch1_ct_dt.png', dpi=120)
print("图像已保存")
```

</details>

---

## 二、奇异信号

奇异信号（Singuar Signals）是信号与系统中一类极其重要的基本信号。它们在 $t=0$ 附近具有不连续性或冲激特性，却有着完美的数学性质，是分析线性系统的基石。

### 🔍 通俗理解

想象一个完美的"瞬间"：闪电在一纳秒内释放全部能量，针尖刺入皮肤的那一瞬间压力无穷大但持续时间趋近于零——这些极端现象就是**冲激**的物理原型。**单位阶跃**则像是开灯：一推开关，电流瞬间从 0 跳到最大值（并保持）。**矩形脉冲**则是"定时炸弹"——在某个时间段内保持固定值，其余时间为零。

> 🎯 **生活类比**：把 $\delta(t)$ 想象成一根无限细但无限重的针——它只扎在 $t=0$ 那一个瞬间，却能测量出函数在 $t=0$ 时的"重量"（即函数值）。这叫**筛选特性**。

---

<details class="def-box" open>
<summary>📖 定义 3：单位冲激信号 δ(t)（Dirac Delta）</summary>

**单位冲激函数** $\delta(t)$ 是一个广义函数，其核心性质是**筛选特性**：

$$\int_{-\infty}^{\infty} x(t)\delta(t - t_0) \, dt = x(t_0) \quad \text{（只要 } x(t) \text{ 在 } t_0 \text{ 处连续）}$$

**严格定义**（分布意义下）：$\delta(t)$ 满足以下两个条件：
1. **筛选性**：$\int_{-\infty}^{\infty} \delta(t) \, dt = 1$
2. **抽样性**：对于任意连续函数 $x(t)$，上述积分恒成立

**形象化理解**：可以将 $\delta(t)$ 看作宽度趋于零、高度趋于无穷大、面积恒为 1 的矩形脉冲的极限：

$$\delta(t) = \lim_{\tau \to 0} \frac{1}{\tau} \text{rect}\left(\frac{t}{\tau}\right)$$

其中 $\text{rect}(t) = \begin{cases} 1 & |t| \leq \frac{1}{2} \\ 0 & |t| > \frac{1}{2} \end{cases}$

**重要性质**：
- $\delta(t)$ 是**偶函数**：$\delta(-t) = \delta(t)$
- $x(t)\delta(t - t_0) = x(t_0)\delta(t - t_0)$
- $\delta(at) = \frac{1}{|a|}\delta(t)$（尺度变换性质）

</details>

<details class="def-box" open>
<summary>📖 定义 4：单位阶跃信号 u(t)（Unit Step）</summary>

**单位阶跃函数** $u(t)$ 定义为：

$$u(t) = \begin{cases} 0 & t < 0 \\ 1 & t > 0 \end{cases}$$

在 $t=0$ 处通常不作定义（也可以定义为 $\frac{1}{2}$）。

**阶跃与冲激的关系**——这是理解两者的关键：

$$u(t) = \int_{-\infty}^{t} \delta(\tau) \, d\tau, \qquad \delta(t) = \frac{du(t)}{dt}$$

冲激是阶跃的微分，阶跃是冲激的积分。两者互为积分微分关系。

**阶跃信号的作用**：可以用来表示"开关"——用阶跃信号乘以任意信号，可以实现"截断"：

$$x(t) \cdot u(t - t_0) = \begin{cases} x(t) & t \geq t_0 \\ 0 & t < t_0 \end{cases}$$

</details>

<details class="def-box" open>
<summary>📖 定义 5：矩形脉冲 rect(t) 与门函数 gate(t)</summary>

**矩形脉冲（门函数）**定义为：

$$\text{rect}\left(\frac{t}{\tau}\right) = \begin{cases} 1 & |t| \leq \frac{\tau}{2} \\ 0 & |t| > \frac{\tau}{2} \end{cases}$$

也可以用阶跃表示：

$$\text{rect}\left(\frac{t}{\tau}\right) = u\left(t + \frac{\tau}{2}\right) - u\left(t - \frac{\tau}{2}\right)$$

```python
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-3, 3, 1000)

# 阶跃信号
u = lambda t: np.where(t >= 0, 1.0, 0.0)

# 矩形脉冲
tau = 2  # 宽度为2
rect = u(t + tau/2) - u(t - tau/2)

# 单位冲激（用窄矩形近似）
delta_approx = np.where(np.abs(t) <= 0.01, 100, 0)  # 宽度0.02，高度100

fig, axes = plt.subplots(3, 1, figsize=(10, 8))
axes[0].plot(t, delta_approx); axes[0].set_title('单位冲激 δ(t)（近似）')
axes[0].axhline(y=0, color='k'); axes[0].set_xlim(-3, 3)
axes[1].plot(t, u(t)); axes[1].set_title('单位阶跃 u(t)')
axes[1].axhline(y=0, color='k'); axes[1].set_xlim(-3, 3)
axes[2].plot(t, rect); axes[2].set_title('矩形脉冲 rect(t/2)')
axes[2].axhline(y=0, color='k'); axes[2].set_xlim(-3, 3)
for ax in axes: ax.grid(True, alpha=0.3)
plt.tight_layout(); plt.savefig('/workspace/signals_ch1_primitive.png', dpi=120)
print("奇异信号图像已保存")
```

</details>

---

## 三、信号的基本运算

### 🔍 通俗理解

信号的运算就像对乐谱进行"演奏变形"：**反转**像是倒放唱片；**平移**像是整首曲子提前或推迟开始；**尺度变换**像是用不同速度播放——快进（时间压缩）或慢放（时间拉伸）。

---

<details class="def-box" open>
<summary>📖 定义 6：信号的基本运算</summary>

给定信号 $x(t)$，定义以下三种基本运算：

**1. 时间反转（Time Reversal）**：
$$y(t) = x(-t)$$
图像上相当于关于纵轴（$t=0$）做镜像对称。

**2. 时间平移（Time Shifting）**：
$$y(t) = x(t - t_0)$$
- $t_0 > 0$：信号**右移**（延迟）
- $t_0 < 0$：信号**左移**（提前）

**3. 尺度变换（Time Scaling）**：
$$y(t) = x(at)$$
- $|a| > 1$：**时间压缩**（信号变窄变快）
- $|a| < 1$：**时间拉伸**（信号变宽变慢）
- $a < 0$：同时包含时间反转

**运算优先级**：通常先做尺度变换，再做反转，最后做平移。
（即从内到外分析：$x(at + b) = x[a(t + b/a)]$ → 先尺度 $a$，再平移 $-b/a$）

```python
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-4, 4, 1000)
x = lambda t: np.where((t >= -1) & (t <= 1), 1.0, 0.0)  # 矩形脉冲

fig, axes = plt.subplots(2, 2, figsize=(12, 8))
axes[0, 0].plot(t, x(t)); axes[0, 0].set_title('原始信号 x(t)')
axes[0, 1].plot(t, x(-t)); axes[0, 1].set_title('反转 x(-t)')
axes[1, 0].plot(t, x(t - 1)); axes[1, 0].set_title('右移 x(t-1)')
axes[1, 1].plot(t, x(2*t)); axes[1, 1].set_title('压缩 x(2t)')

for ax in axes.flat:
    ax.grid(True, alpha=0.3); ax.set_xlim(-4, 4); ax.set_ylim(-0.5, 1.5)
plt.tight_layout(); plt.savefig('/workspace/signals_ch1_ops.png', dpi=120)
print("信号运算图像已保存")
```

</details>

---

## 四、周期性与奇偶性

### 🔍 通俗理解

**周期性**就像四季循环——每隔固定时间，规律就会重复。一首有固定 BPM 的曲子就是周期信号；股票走势则是非周期的。判断周期性，是后续傅里叶分析的关键前提。

---

<details class="def-box" open>
<summary>📖 定义 7：周期信号与非周期信号</summary>

**周期信号** $x(t)$ 满足：存在最小正数 $T_0 > 0$，使得

$$x(t + T_0) = x(t), \quad \forall t \in \mathbb{R}$$

$T_0$ 称为**基本周期**（Fundamental Period），简称周期。

**非周期信号**：不存在满足上述条件的 $T_0$，即信号从不精确重复。

**正弦信号的周期**：对于 $x(t) = A\sin(\omega_0 t + \phi)$，
$$T_0 = \frac{2\pi}{\omega_0}$$

**判断方法**：
1. 设 $x(t + T) = x(t)$
2. 解出所有 $T$ 的值
3. 取最小正 $T$ 即为 $T_0$

**周期信号的叠加**：两个周期信号 $x_1(t)$（周期 $T_1$）和 $x_2(t)$（周期 $T_2$）之和仍是周期信号的**充要条件**是 $\frac{T_1}{T_2}$ 为有理数。

</details>

---

<details class="def-box" open>
<summary>📖 定义 8：信号的奇偶分解</summary>

任意信号 $x(t)$ 可以唯一分解为**偶部**与**奇部**之和：

$$x(t) = x_e(t) + x_o(t)$$

其中：

$$x_e(t) = \frac{x(t) + x(-t)}{2} \quad \text{（偶部）}$$
$$x_o(t) = \frac{x(t) - x(-t)}{2} \quad \text{（奇部）}$$

**性质**：
- $x_e(t) = x_e(-t)$（关于 $t=0$ 对称）
- $x_o(t) = -x_o(-t)$（关于 $t=0$ 反对称）
- 奇信号在一个对称区间上的积分恒为零：$\int_{-a}^{a} x_o(t) \, dt = 0$

</details>

---

## 五、能量信号与功率信号

### 🔍 通俗理解

想象一个跑步者的能量消耗：短跑运动员在 10 秒内爆发全部能量（高能量但总能量有限）；马拉松运动员持续稳定地消耗能量。如果在无限长的时间里，平均功率为正且有限，那就像一台持续工作的机器——这就是功率信号。

---

<details class="def-box" open>
<summary>📖 定义 9：能量与功率</summary>

**信号能量**（总能量）定义为：

$$E = \int_{-\infty}^{\infty} |x(t)|^2 \, dt$$

**信号平均功率**定义为：

$$P = \lim_{T \to \infty} \frac{1}{T} \int_{-T/2}^{T/2} |x(t)|^2 \, dt$$

**分类**：
- **能量信号**：$0 < E < \infty$ 且 $P = 0$（总能量有限，平均功率为零）
- **功率信号**：$P > 0$ 且 $E = \infty$（总能量无限，但平均功率有限）
- **非能量非功率信号**：既不满足能量信号也不满足功率信号的条件

**典型例子**：
- 有限时宽脉冲（如矩形脉冲、衰减指数）：**能量信号**
- 周期信号（如无限正弦波）：**功率信号**
- 随机信号：通常为功率信号

**注意**：**无限时长**的正弦信号 $\sin(\omega_0 t)$ 是功率信号，因为 $E = \infty$ 但 $P = \frac{1}{2}$。

```python
import numpy as np

# 示例：有限矩形脉冲的能量
T = 2  # 脉冲宽度
A = 3  # 脉冲幅度
E_rect = A**2 * T  # E = A² × T = 9 × 2 = 18

print(f"矩形脉冲（幅度={A}, 宽度={T}）的能量: E = {E_rect}")

# 示例：正弦信号的功率
# 对于 x(t) = A·sin(ω₀t)，平均功率 P = A²/2
A = 2
P_sin = A**2 / 2
print(f"正弦波（幅度={A}）的平均功率: P = {P_sin}")
```

</details>

---

## 六、系统的分类与 LTI 系统

### 🔍 通俗理解

把系统想象成一个"黑箱"：你从一边输入信号 $x(t)$，从另一边得到输出 $y(t)$。不同的黑箱有不同的特性——有些公平对待所有输入（线性），有些对同样的输入总给出同样输出（时不变），有些只看过去和现在不看未来（因果）。

---

<details class="def-box" open>
<summary>📖 定义 10：系统的分类</summary>

**1. 线性系统（Linear）vs 非线性系统**

线性系统满足**叠加原理**：

$$T\{a x_1(t) + b x_2(t)\} = a \, T\{x_1(t)\} + b \, T\{x_2(t)\}$$

其中 $T\{\cdot\}$ 表示系统对输入的变换。

**齐次性**：$T\{a x(t)\} = a \, T\{x(t)\}$
**可加性**：$T\{x_1 + x_2\} = T\{x_1\} + T\{x_2\}$

> 🎯 **生活类比**：线性系统像是公平的"称重机"——两份东西一起称，重量等于分别称的重量之和。

**2. 时不变系统（Time-Invariant）vs 时变系统**

时不变意味着：输入推迟 $t_0$，输出也推迟 $t_0$：

$$y(t) = T\{x(t)\} \implies y(t - t_0) = T\{x(t - t_0)\}$$

**3. 因果系统（Causal）vs 非因果系统**

因果系统的输出只取决于当前及过去的输入：

$$y(t_0) = f(x(t), \, t \leq t_0)$$

**非因果**：输出取决于未来输入（如 $y(t) = x(t+1)$）
**反因果**：输出只取决于未来输入

> 🎯 **生活类比**：因果系统像是实时处理——你只能根据"已经发生的事"做决定；非因果系统像是"预知未来"——它能利用还没发生的信息，这在物理上通常不可实现。

**4. 稳定系统（BIBO 稳定）vs 不稳定系统**

**BIBO 稳定**（Bounded-Input Bounded-Output）：所有有界输入都产生有界输出：

$$\forall |x(t)| \leq M_x \implies \exists M_y \text{ 使 } |y(t)| \leq M_y, \forall t$$

</details>

---

<details class="def-box" open>
<summary>📖 定义 11：线性时不变系统（LTI 系统）</summary>

同时满足**线性**和**时不变性**的系统称为 **LTI 系统**（Linear Time-Invariant）。

**LTI 系统的两个核心性质**：

**① 卷积积分**（连续时间 LTI 系统的核心）

任意 LTI 连续系统的输出等于输入与系统冲激响应的**卷积**：

$$y(t) = x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau) \, h(t - \tau) \, d\tau$$

其中 $h(t) = T\{\delta(t)\}$ 是系统对单位冲激的响应（**冲激响应**）。

**② 交换律、分配律、结合律**

$$x * h = h * x \quad \text{（交换律）}$$
$$x * (h_1 + h_2) = x * h_1 + x * h_2 \quad \text{（分配律）}$$
$$(x * h_1) * h_2 = x * (h_1 * h_2) \quad \text{（结合律）}$$

**串联（级联）**：两个 LTI 系统级联的等效冲激响应为 $h = h_1 * h_2$（与顺序无关）
**并联**：$h = h_1 + h_2$

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

# 定义输入信号和冲激响应
t = np.linspace(-5, 5, 1000)
dt = t[1] - t[0]

# x(t) = rect(t/2)，h(t) = exp(-t)u(t)
x = np.where((t >= -1) & (t <= 1), 1.0, 0.0)
h = np.where(t >= 0, np.exp(-t), 0.0)

# 用卷积计算输出
y = np.convolve(x, h) * dt
t_y = np.linspace(-10, 10, len(y))

fig, axes = plt.subplots(3, 1, figsize=(10, 7))
axes[0].plot(t, x); axes[0].set_title('输入信号 x(t)'); axes[0].grid(True)
axes[1].plot(t, h); axes[1].set_title('冲激响应 h(t)'); axes[1].grid(True)
axes[2].plot(t_y, y); axes[2].set_title('输出 y(t) = x(t) * h(t)'); axes[2].grid(True)
for ax in axes: ax.set_xlim(-6, 6)
plt.tight_layout(); plt.savefig('/workspace/signals_ch1_lti.png', dpi=120)
print("LTI系统卷积图像已保存")
```

</details>

---

## 六、练习题

1. **（周期性判断）** 判断信号 $x(t) = \sin(2t) + \cos(3t)$ 是否为周期信号？如果是，求其基本周期。

2. **（信号运算）** 已知信号 $x(t)$ 的图像如下，绘制 $y(t) = x(2t+3)$ 的图像，并说明经过了哪些运算（按先后顺序）。

3. **（能量与功率）** 计算有限脉冲信号 $x(t) = A e^{-|t|}$ 的总能量 $E$，并判断它是能量信号还是功率信号。

4. **（奇偶分解）** 求信号 $x(t) = e^{-t} u(t) + \sin(t)$ 的偶部 $x_e(t)$ 和奇部 $x_o(t)$。

5. **（系统性质判断）** 判断以下系统是否为线性、时不变、因果、BIBO 稳定：
   - (a) $y(t) = x(t) + x(t-1)$
   - (b) $y(t) = t \cdot x(t)$
   - (c) $y(t) = x(t)^2$

6. **（卷积计算）** 已知 $x(t) = u(t) - u(t-1)$（宽度为 1 的单位矩形脉冲），$h(t) = e^{-t} u(t)$，求 $y(t) = x(t) * h(t)$，并给出 $0 \leq t \leq 2$ 区间内的表达式。

---

> 💡 **本章小结**：本章建立了信号与系统的基本框架。重点掌握：连续/离散信号的区分、三大奇异信号（冲激、阶跃、矩形脉冲）的定义与关系、信号三大运算（反转/平移/尺度）的几何含义、周期信号判断、能量/功率信号分类，以及 LTI 系统的叠加原理与卷积积分。这些概念将在后续傅里叶分析中被反复使用。
