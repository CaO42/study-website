# 第2章：连续时间信号的傅里叶分析

> **本章简介**：傅里叶分析是信号与系统的灵魂。本章从周期信号的傅里叶级数出发，揭示"任意周期信号都可以分解为正弦和余弦之和"这一惊人事实；然后将这一思想推广到非周期信号，得到傅里叶变换这一最重要的分析工具。我们将学习傅里叶级数的 Dirichlet 条件、Gibbs 现象，以及傅里叶变换的线性、时移、尺度变换、对称性和卷积定理，最后用帕塞瓦尔定理建立时域能量与频域能量的联系。
>
> ⏱ 预估学时：5 小时 | 难度：⭐⭐⭐ | 📍 前置：第1章基础、微积分（积分计算）

---

## 一、从乐谱说起：为什么需要傅里叶分析？

### 🔍 通俗理解

想象一个交响乐团：每种乐器发出不同频率的声音，叠加在一起形成复杂的交响乐。**傅里叶分析**就是逆向工程——给你一段音乐波形，它能告诉你"其中包含哪些乐器、每个乐器演奏的音量有多大"。数学上，每个"乐器"就是正弦波，不同乐器叠加就是**傅里叶级数**。

> 🎯 **生活类比**：把傅里叶分析想象成三棱镜——白光通过三棱镜分解成七色光（不同波长），傅里叶变换则把复杂信号"分解"成不同频率的"颜色"（正弦波）。

---

## 二、周期信号的傅里叶级数

### 🔍 通俗理解

**傅里叶级数**的核心思想是：任何满足一定条件的**周期函数**，都可以用一系列正弦和余弦函数叠加来精确表示。就像任何 3D 物体都可以用 RGB 三原色按不同比例混合来显示一样。

---

<details class="def-box" open>
<summary>📖 定义 1：三角傅里叶级数（Trigonometric FS）</summary>

设周期信号 $x(t)$ 的周期为 $T_0$，基波频率 $\omega_0 = \frac{2\pi}{T_0}$，若满足 **Dirichlet 条件**（见后），则可以展开为：

$$x(t) = a_0 + \sum_{n=1}^{\infty} \left[ a_n \cos(n\omega_0 t) + b_n \sin(n\omega_0 t) \right]$$

**系数公式**（正交性推导）：

$$a_0 = \frac{1}{T_0} \int_{-T_0/2}^{T_0/2} x(t) \, dt = \text{直流分量（平均值）}$$

$$a_n = \frac{2}{T_0} \int_{-T_0/2}^{T_0/2} x(t) \cos(n\omega_0 t) \, dt, \quad n \geq 1$$

$$b_n = \frac{2}{T_0} \int_{-T_0/2}^{T_0/2} x(t) \sin(n\omega_0 t) \, dt, \quad n \geq 1$$

**物理意义**：
- $a_0$：信号的直流分量（零频率）
- $a_n, b_n$：第 $n$ 次谐波的余弦和正弦分量
- $n=1$：基波（频率 $\omega_0$），分量最大
- $n=2,3,...$：高次谐波

</details>

<details class="def-box" open>
<summary>📖 定义 2：指数傅里叶级数（Exponential FS）</summary>

利用**欧拉公式**，三角形式可以写成更紧凑的指数形式：

$$\cos(n\omega_0 t) = \frac{e^{jn\omega_0 t} + e^{-jn\omega_0 t}}{2}, \quad \sin(n\omega_0 t) = \frac{e^{jn\omega_0 t} - e^{-jn\omega_0 t}}{2j}$$

得到**指数傅里叶级数**：

$$x(t) = \sum_{n=-\infty}^{\infty} c_n \, e^{jn\omega_0 t}$$

其中复系数：

$$c_n = \frac{1}{T_0} \int_{-T_0/2}^{T_0/2} x(t) \, e^{-jn\omega_0 t} \, dt$$

**与三角系数的关系**：
$$c_0 = a_0, \quad c_n = \frac{a_n - jb_n}{2}, \quad c_{-n} = \frac{a_n + jb_n}{2}$$

**幅度谱**：$|c_n|$ 描述了各频率分量的幅度
**相位谱**：$\angle c_n$ 描述了各频率分量的相位

**为什么指数形式更好？**
- 形式更简洁（只需计算一套系数 $c_n$）
- 自动包含正负频率（对应正逆旋转的两个矢量）
- 与傅里叶变换、LTI 系统分析完美对接

```python
import numpy as np
import matplotlib.pyplot as plt

# 方波的指数傅里叶级数展开
T0 = 2 * np.pi
omega0 = 1
N = 50  # 取50次谐波
t = np.linspace(-3*np.pi, 3*np.pi, 2000)

# 方波: x(t) = 1 for |t|<T0/4, x(t) = -1 for T0/4<|t|<T0/2
x_square = np.where(np.abs(t % T0) < T0/4, 1.0, -1.0)
x_square = np.where(np.abs((t % T0) - T0/2) < T0/4, 1.0, x_square)

# 指数FS系数（近似，用数值积分）
def fs_exp_coef(x_t, t, T0, n_max):
    coeffs = []
    dt = t[1] - t[0]
    for n in range(-n_max, n_max+1):
        kernel = np.exp(-1j * n * omega0 * t)
        c_n = np.sum(x_t * kernel) * dt / T0
        coeffs.append((n, np.abs(c_n), np.angle(c_n)))
    return coeffs

coeffs = fs_exp_coef(x_square, t, T0, N)
ns = [c[0] for c in coeffs]
magnitudes = [c[1] for c in coeffs]

# 重建信号（有限项和）
x_recon = np.zeros_like(t, dtype=complex)
for n, mag, phase in coeffs:
    x_recon += mag * np.exp(1j * phase) * np.exp(1j * n * omega0 * t)
x_recon = x_recon.real

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 7))
ax1.plot(t, x_square, 'b-', label='原始方波', alpha=0.5)
ax1.plot(t, x_recon, 'r-', label=f'FS展开 (N={N})', linewidth=1.5)
ax1.set_title('周期方波的傅里叶级数展开'); ax1.legend(); ax1.grid(True)
ax2.stem(ns[:100:2], magnitudes[:100:2], basefmt='b-')
ax2.set_title('幅度谱 |c_n|'); ax2.set_xlabel('谐波次数 n'); ax2.grid(True)
plt.tight_layout(); plt.savefig('/workspace/signals_ch2_fs.png', dpi=120)
print("傅里叶级数图像已保存")
```

</details>

<details class="proof-box" open>
<summary>📐 推导：正交性与系数公式</summary>

三角函数族 $\{\cos(n\omega_0 t), \sin(n\omega_0 t)\}$ 在 $[-T_0/2, T_0/2]$ 上具有**正交性**：

$$\int_{-T_0/2}^{T_0/2} \cos(m\omega_0 t) \cos(n\omega_0 t) \, dt = \begin{cases} T_0/2 & m = n \neq 0 \\ T_0 & m = n = 0 \\ 0 & m \neq n \end{cases}$$

$$\int_{-T_0/2}^{T_0/2} \sin(m\omega_0 t) \sin(n\omega_0 t) \, dt = \begin{cases} T_0/2 & m = n \neq 0 \\ 0 & m \neq n \end{cases}$$

$$\int_{-T_0/2}^{T_0/2} \cos(m\omega_0 t) \sin(n\omega_0 t) \, dt = 0 \quad \forall m, n$$

**证明 $a_n$ 公式**：对展开式两边乘以 $\cos(n\omega_0 t)$ 并在 $[-T_0/2, T_0/2]$ 积分，利用正交性，只有 $m=n$ 的项留下：

$$\int x(t)\cos(n\omega_0 t) \, dt = a_n \cdot \frac{T_0}{2} \implies a_n = \frac{2}{T_0}\int x(t)\cos(n\omega_0 t) \, dt$$

其他系数同理。

</details>

---

## 三、Dirichlet 条件与 Gibbs 现象

### 🔍 通俗理解

**Dirichlet 条件**是"什么样的周期函数才能展开成傅里叶级数"的数学保证——条件很宽松：有限个间断点、有限个极值点、绝对可积。现实中几乎所有有实际意义的信号都满足。

**Gibbs 现象**则是一个让人惊讶的结果：用有限项傅里叶级数逼近有间断点的信号（如方波）时，在间断点附近会产生一个"过冲"——这个过冲高度约为峰值值的 9%，且不随项数增加而消失，只是变得更窄。

> 🎯 **生活类比**：Gibbs 现象就像用有限阶泰勒级数逼近 $|x|$ 在 $x=0$ 处的尖点——无论如何截断，总会在尖点处留下一个小"耳朵"。这是傅里叶级数的固有特性，不是计算错误。

---

<details class="def-box" open>
<summary>📖 定义 3：Dirichlet 条件</summary>

周期函数 $x(t)$ 能展开成一致收敛的傅里叶级数的充分条件（Dirichlet 条件）：

1. 在一个周期内，**绝对可积**：$\int_{-T_0/2}^{T_0/2} |x(t)| \, dt < \infty$
2. 在一个周期内，$x(t)$ 只有**有限个极大值和极小值点**
3. 在一个周期内，$x(t)$ 只有**有限个第一类间断点**（左右极限存在但不相等）

**注意**：Dirichlet 条件是充分条件，不是必要条件。

</details>

<details class="def-box" open>
<summary>📖 定义 4：Gibbs 现象</summary>

设 $x(t)$ 在 $t_0$ 处有第一类间断点，$S_N(t)$ 为 $N$ 项傅里叶级数部分和。则在 $t_0$ 附近：

$$\lim_{N\to\infty} S_N(t_0 + \frac{\pi}{N\omega_0}) \approx x(t_0^+) + 0.089 \cdot \Delta x$$

其中 $\Delta x = x(t_0^+) - x(t_0^-)$ 为跳变量。

**特点**：
- 过冲量约为跳变量的 **8.949%**（≈ 9%）
- 无论 $N$ 多大，**永不完全消失**
- $N$ 增大仅使过冲区域变窄

</details>

---

## 四、从周期到非周期：傅里叶变换

### 🔍 通俗理解

非周期信号可以理解为"周期趋向无穷大"的周期信号。当 $T_0 \to \infty$ 时，基波频率 $\omega_0 \to 0$，原本离散的谐波线（谱线）变得无限密集，从离散谱变成了连续谱。这就是**傅里叶变换**的核心思想。

> 🎯 **生活类比**：想象离散谱是乐谱上的音符（每个音符是一个固定的音高/频率）。而非周期信号的频谱就像从乐谱变成了连续的声音频谱——你能听到从一个频率到另一个频率的连续变化，而不是只有离散的音符。

---

<details class="def-box" open>
<summary>📖 定义 5：傅里叶变换（FT）与逆变换</summary>

**傅里叶变换**（连续时间）：

$$X(j\omega) = \int_{-\infty}^{\infty} x(t) \, e^{-j\omega t} \, dt$$

**逆傅里叶变换**：

$$x(t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} X(j\omega) \, e^{j\omega t} \, d\omega$$

**频率 $\omega$** 的单位是 rad/s（弧度/秒），与频率 $f$ 的关系为 $\omega = 2\pi f$。

**傅里叶变换的存在条件**：Dirichlet 条件（对于非周期信号同样适用）。

**傅里叶变换的物理意义**：
- $|X(j\omega)|$：**幅度谱**，描述各频率成分的强弱
- $\angle X(j\omega)$：**相位谱**，描述各频率成分的延迟

</details>

<details class="proof-box" open>
<summary>📐 推导：从傅里叶级数到傅里叶变换</summary>

从指数傅里叶级数出发：

$$x(t) = \sum_{n=-\infty}^{\infty} c_n \, e^{jn\omega_0 t}, \quad c_n = \frac{1}{T_0}\int_{-T_0/2}^{T_0/2} x(t)e^{-jn\omega_0 t}dt$$

将 $c_n$ 代入：

$$x(t) = \sum_{n=-\infty}^{\infty} \left[ \frac{1}{T_0}\int_{-T_0/2}^{T_0/2} x(\tau)e^{-jn\omega_0\tau}d\tau \right] e^{jn\omega_0 t}$$

令 $T_0 \to \infty$，则 $\omega_0 \to d\omega$（连续），$n\omega_0 \to \omega$（连续变量），求和变为积分：

$$\frac{1}{T_0} = \frac{\omega_0}{2\pi} \to \frac{d\omega}{2\pi}$$

于是：

$$x(t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} \underbrace{\left[ \int_{-\infty}^{\infty} x(\tau)e^{-j\omega\tau}d\tau \right]}_{X(j\omega)} e^{j\omega t} d\omega$$

即得到傅里叶变换 $X(j\omega)$ 和逆变换。

</details>

---

## 五、傅里叶变换的基本性质

傅里叶变换有六大核心性质，是信号与系统分析的重要工具：

---

<details class="def-box" open>
<summary>📖 性质 1：线性（Linearity）</summary>

$$\mathcal{F}\{a x_1(t) + b x_2(t)\} = a X_1(j\omega) + b X_2(j\omega)$$

**证明**：直接代入定义式，利用积分的线性即可。

**应用**：叠加原理在频域的体现。

</details>

<details class="def-box" open>
<summary>📖 性质 2：时移性质（Time Shifting）</summary>

$$x(t - t_0) \xleftrightarrow{\mathcal{F}} X(j\omega) \cdot e^{-j\omega t_0}$$

即：信号在时域平移 $t_0$，在频域相当于乘以相位因子 $e^{-j\omega t_0}$（**不改变幅度谱，仅改变相位谱**）。

**证明**：

$$\int x(t-t_0)e^{-j\omega t}dt = \int x(\tau)e^{-j\omega(\tau+t_0)}d\tau = e^{-j\omega t_0} \int x(\tau)e^{-j\omega\tau}d\tau = e^{-j\omega t_0} X(j\omega)$$

**应用**：延迟导致相位旋转，在通信系统中理解多径效应。

</details>

<details class="def-box" open>
<summary>📖 性质 3：尺度变换（Time Scaling）</summary>

$$x(at) \xleftrightarrow{\mathcal{F}} \frac{1}{|a|} X\left(\frac{j\omega}{a}\right)$$

**含义**：
- $|a| > 1$：时间压缩 $a$ 倍 $\Rightarrow$ 频谱展宽 $a$ 倍，幅度降低 $|a|$ 倍
- $|a| < 1$：时间拉伸 $a$ 倍 $\Rightarrow$ 频谱压缩 $a$ 倍，幅度升高

> 🎯 **生活类比**：快进一首歌（时间压缩 $2\times$），听到的是频率更高的"尖细"声音——高频成分变多了。这就是为什么 2 倍速播放的人声听起来像"唐老鸭"。

**特例**：$a = -1$（时间反转）：
$$x(-t) \xleftrightarrow{\mathcal{F}} X(-j\omega)$$

</details>

<details class="def-box" open>
<summary>📖 性质 4：对称性（Duality）</summary>

若 $x(t) \xleftrightarrow{\mathcal{F}} X(j\omega)$，则：

$$X(t) \xleftrightarrow{\mathcal{F}} 2\pi x(-\omega)$$

**重要特例**：矩形脉冲 $\leftrightarrow$ sinc 函数：

$$\text{rect}\left(\frac{t}{\tau}\right) \xleftrightarrow{\mathcal{F}} \tau \, \text{sinc}\left(\frac{\omega\tau}{2}\right)$$

其中 $\text{sinc}(x) = \frac{\sin x}{x}$。

```python
import numpy as np
import matplotlib.pyplot as plt

# 验证尺度变换性质
t = np.linspace(-8, 8, 2000)
omega = np.linspace(-20, 20, 2000)

# 原始信号：宽矩形脉冲
x1 = np.where(np.abs(t) <= 2, 1.0, 0.0)
# 压缩：窄矩形脉冲
x2 = np.where(np.abs(t) <= 1, 1.0, 0.0)

# 数值计算傅里叶变换（用FFT近似）
dt = t[1] - t[0]
X1 = np.fft.fftshift(np.fft.fft(x1)) * dt
X2 = np.fft.fftshift(np.fft.fft(x2)) * dt
freq = np.fft.fftshift(np.fft.fftfreq(len(t), dt))

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 7))
ax1.plot(t, x1, label='x₁(t): 宽脉冲', t, x2, label='x₂(t): 窄脉冲')
ax1.set_title('时域：窄脉冲 = 宽脉冲时间压缩 2×'); ax1.legend(); ax1.grid(True)
ax2.plot(freq, np.abs(X1), label='|X₁(jω)|', freq, np.abs(X2), label='|X₂(jω)|')
ax2.set_title('频域：压缩→展宽（幅度×2）'); ax2.legend(); ax2.grid(True)
ax2.set_xlabel('ω (rad/s)')
plt.tight_layout(); plt.savefig('/workspace/signals_ch2_scaling.png', dpi=120)
print("尺度变换性质验证图已保存")
```

</details>

<details class="def-box" open>
<summary>📖 性质 5：卷积定理（Convolution Theorem）</summary>

**时域卷积 $\Leftrightarrow$ 频域乘积**（最重要的性质！）：

$$\mathcal{F}\{x(t) * h(t)\} = X(j\omega) \cdot H(j\omega)$$

$$\mathcal{F}\{x(t) \cdot h(t)\} = \frac{1}{2\pi} X(j\omega) * H(j\omega)$$

**意义**：LTI 系统的输出 $y(t) = x(t)*h(t)$ 在频域中变为简单的乘法 $Y(j\omega) = X(j\omega)H(j\omega)$。这使得 LTI 系统分析在频域变得极其高效！

**$H(j\omega)$ 的物理意义**：**频率响应**（系统函数），描述系统对各频率的放大/衰减和相位移动。

$$H(j\omega) = \frac{Y(j\omega)}{X(j\omega)} = \mathcal{F}\{h(t)\}$$

</details>

<details class="def-box" open>
<summary>📖 性质 6：时域微分与积分</summary>

**时域微分**：

$$\frac{dx(t)}{dt} \xleftrightarrow{\mathcal{F}} j\omega \, X(j\omega)$$

**时域积分**（假设 $x(t)$ 无直流分量，或考虑积分的直流分量）：

$$\int_{-\infty}^{t} x(\tau) d\tau \xleftrightarrow{\mathcal{F}} \frac{1}{j\omega} X(j\omega) + \pi X(0)\delta(\omega)$$

**应用**：常用于求解线性微分方程对应的系统函数。

</details>

---

## 六、帕塞瓦尔定理

<details class="def-box" open>
<summary>📖 定义 6：帕塞瓦尔定理（Parseval's Theorem）</summary>

帕塞瓦尔定理建立了**时域能量**与**频域能量**的等价关系：

$$\int_{-\infty}^{\infty} |x(t)|^2 dt = \frac{1}{2\pi} \int_{-\infty}^{\infty} |X(j\omega)|^2 d\omega = \int_{-\infty}^{\infty} |X(j\omega)|^2 df$$

**含义**：信号的总能量等于其频谱幅度平方的积分（两边相等）。

$|X(j\omega)|^2$ 称为**能量谱密度**，描述能量在频率上的分布。

**物理意义**：能量在时域和频域是守恒的——不会因为换了"坐标系"（从时间到频率）而丢失能量。

**证明概要**：利用逆变换代入 $|x(t)|^2 = x(t)x^*(t)$：

$$E = \int |x(t)|^2 dt = \int x(t) \left[\frac{1}{2\pi}\int X(j\omega)e^{j\omega t}d\omega\right]^* dt$$

经过交换积分次序并利用 $\delta$ 函数的筛选性可得。

```python
import numpy as np

# 验证帕塞瓦尔定理
t = np.linspace(-10, 10, 10000)
dt = t[1] - t[0]
x = np.exp(-np.abs(t))  # 双边指数衰减信号

# 时域能量
E_time = np.sum(np.abs(x)**2) * dt

# 频域能量（数值FT）
X = np.fft.fftshift(np.fft.fft(x)) * dt
freq = np.fft.fftshift(np.fft.fftfreq(len(t), dt))
domega = freq[1] - freq[0]
E_freq = np.sum(np.abs(X)**2) * (domega / (2*np.pi))

print(f"时域能量 E = {E_time:.6f}")
print(f"频域能量 E = {E_freq:.6f}")
print(f"相对误差: {abs(E_time - E_freq)/E_time * 100:.4f}%")
```

</details>

---

## 七、重要信号对

<details class="def-box" open>
<summary>📖 信号对汇总</summary>

| 时域 $x(t)$ | 频域 $X(j\omega)$ |
|---|---|
| $\delta(t)$ | $1$ |
| $1$ | $2\pi\delta(\omega)$ |
| $u(t)$ | $\pi\delta(\omega) + \frac{1}{j\omega}$ |
| $e^{-at}u(t),\ a>0$ | $\frac{1}{a+j\omega}$ |
| $e^{-a|t|}$ | $\frac{2a}{a^2+\omega^2}$ |
| $\text{rect}(t/\tau)$ | $\tau\text{sinc}(\omega\tau/2)$ |
| $\text{sinc}(Bt)$ | $\frac{\pi}{B}\text{rect}(\omega/2B)$ |
| $\cos(\omega_0 t)$ | $\pi[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)]$ |
| $\sin(\omega_0 t)$ | $-j\pi[\delta(\omega-\omega_0)-\delta(\omega+\omega_0)]$ |

</details>

---

## 练习题

1. **（傅里叶级数）** 求周期方波信号 $x(t)$（$T_0=4$，$x(t)=1$ for $0<t<2$，$x(t)=-1$ for $-2<t<0$）的三角傅里叶级数系数 $a_0, a_n, b_n$。

2. **（Gibbs 现象）** 对方波信号的有限项傅里叶级数，在 $N=5, 20, 100$ 时分别画出近似波形，观察 Gibbs 过冲区域随 $N$ 的变化。

3. **（傅里叶变换计算）** 求信号 $x(t) = e^{-2t}u(t)$ 的傅里叶变换 $X(j\omega)$，并画出 $|X(j\omega)|$ 和 $\angle X(j\omega)$。

4. **（性质应用）** 已知 $x(t) \xleftrightarrow{\mathcal{F}} X(j\omega)$，利用性质求：
   - (a) $y(t) = x(2t-3)$ 的傅里叶变换
   - (b) $y(t) = \frac{d}{dt}[x(t-1)]$ 的傅里叶变换

5. **（卷积定理）** 已知 $x(t) = \text{rect}(t)$，$h(t) = e^{-t}u(t)$，用卷积定理求 $y(t) = x(t) * h(t)$ 的频谱 $Y(j\omega)$。

6. **（帕塞瓦尔定理）** 验证 $x(t) = e^{-|t|}$ 信号的时域能量等于频域能量，并给出数值结果（误差 $< 1\%$）。

---

> 💡 **本章小结**：傅里叶分析是贯穿整个信号与系统课程的核心工具。三角/指数傅里叶级数将周期信号分解为离散的谐波分量，傅里叶变换将这一思想推广到非周期信号得到连续频谱。六大基本性质（线性、时移、尺度、对称、卷积、微分积分）是我们分析信号和系统的强大武器，帕塞瓦尔定理则保证了能量在时频域间的守恒。
