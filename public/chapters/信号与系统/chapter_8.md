# 第8章：通信系统中的信号变换

> **本章简介**：从 AM 收音机到 5G 通信，所有的无线传输都离不开**调制**——把低频信息"搬运"到高频载波上。本章系统学习幅度调制（AM、DSB-SC、SSB）和角度调制（FM、PM），理解调制指数、带宽、检波方式等核心概念。重点掌握**频谱搬移**的物理意义（低频信号乘以载波 → 频谱向载波频率两侧平移）、同步检波与包络检波的适用条件，以及**带通采样定理**在欠采样通信中的巧妙应用。
>
> ⏱ 预估学时：4 小时 | 难度：⭐⭐⭐ | 📍 前置：傅里叶变换（连续时间）、滤波器设计（第7章）

---

## 一、为什么需要调制？

### 🔍 把信号"搬运"到空中去

**调制（Modulation）**是将信息信号（基带信号，通常频率低）附加到高频载波上的过程，使得信号能够：
1. **有效辐射**：低频信号的天线太长（$\lambda = c/f$，1 MHz 信号的波长约 300 m），无法有效辐射到空间
2. **多路复用**：不同载波频率的信号可以在同一空间中共存（频分复用）
3. **抗干扰**：高频调制信号对低频噪声有更强的抵抗力

> 🎯 **生活类比**：想象你有一封非常重要的信（基带信号）。如果你直接"广播"它，声音太小——只有附近的人能听见。但如果你把信的内容翻译成**摩尔斯电码**，用强力探照灯（载波）向天空发送闪烁的光信号，那么很远的人都能看到这束光。调制就是那束"探照灯"，它把信息"搬运"到更远的地方。

---

<details class="def-box" open>
<summary>📖 定义：调制的基本结构</summary>

**调制器（Modulator）**的一般结构：

$$y(t) = A_c \cdot x(t) \cdot \cos(\omega_c t + \phi_0)$$

其中：
- $A_c$：**载波幅度**
- $\omega_c = 2\pi f_c$：**载波角频率**（$f_c$ 为载波频率，单位 Hz）
- $x(t)$：**基带信号**（调制信号，通常 $|x(t)| \leq 1$）
- $\phi_0$：**初始相位**

**调制方式分类**：
- **幅度调制（AM）**：改变载波的**幅度** $A_c$
- **角度调制（Angle Modulation）**：改变载波的**相位**或**频率**
  - 相位调制（PM）：$\phi(t) = k_p x(t)$
  - 频率调制（FM）：$\frac{d\phi(t)}{dt} = k_f x(t)$

</details>

---

## 二、幅度调制（AM）

### 🔍 用信号的"高低"控制载波的"强弱"

**幅度调制**是最直观的调制方式——信号的瞬时值越大，载波的瞬时幅度就越大。回顾一下乘积定理：$\cos(\omega_c t) \cdot \cos(\omega_m t)$ 会产生 **和频** 和 **差频** 两个分量——这就是频谱搬移的数学基础。

---

<details class="def-box" open>
<summary>📖 标准 AM（Full AM / DSB-FC）</summary>

$$y(t) = A_c[1 + m \cdot x(t)] \cos(\omega_c t)$$

其中 $x(t)$ 是归一化基带信号（$|x(t)| \leq 1$），$m$ 是**调制指数**（$0 \leq m \leq 1$）。

**已调信号幅度**：$A(t) = A_c[1 + mx(t)]$，随 $x(t)$ 变化

**时域波形**：

```
y(t)
 ↑
 A_c[1+m] ────────────────╲  ╱─────────────
                          ╲╱╱  (包络 = 1+mx(t))
 A_c ─────────────────────╱╲╲─────────────
                          ╱  ╲
 A_c[1-m] ────────────────╱  ╲─────────────
 ↓
     └─────────────────────→ t
```

**频谱**（设 $X(j\omega)$ 为 $x(t)$ 的傅里叶变换）：

$$Y(j\omega) = \pi A_c \left[\delta(\omega - \omega_c) + \delta(\omega + \omega_c)\right] + \frac{mA_c}{2}[X(j(\omega-\omega_c)) + X(j(\omega+\omega_c))]$$

频谱包含：
- **载波分量**（DC → 两个冲激在 $\pm\omega_c$）
- **上、下边带**（$X(j\omega)$ 分别平移到 $\pm\omega_c$ 两侧）

**调制指数的几何意义**：$m = (A_{\max} - A_{\min}) / (A_{\max} + A_{\min})$，即包络的峰谷比。

> ⚠️ **过调制**：若 $m > 1$，$|mx(t)|$ 会在某些时刻超过 1，导致包络反向（相位翻转），信号失真且无法用包络检波恢复。

</details>

<details class="def-box" open>
<summary>📖 DSB-SC（抑制载波双边带）</summary>

$$y(t) = A_c x(t) \cos(\omega_c t) = \frac{A_c}{2}[x(t)e^{j\omega_c t} + x(t)e^{-j\omega_c t}]$$

**频谱**：仅有两个边带，没有载波分量！

$$Y(j\omega) = \frac{A_c}{2}[X(j(\omega-\omega_c)) + X(j(\omega+\omega_c))]$$

**优点**：功率利用率高（没有功率浪费在载波上）
**缺点**：无法用包络检波恢复信号，必须用**同步检波**

**与标准 AM 的关系**：DSB-SC = AM（去掉载波后的版本）

</details>

<details class="def-box" open>
<summary>📖 SSB（单边带）</summary>

**DSB-SC 的问题**：上下两个边带各携带相同的信息（对称），浪费了一半的带宽！

**SSB 的解决方案**：只发送一个边带（上边带 USB 或下边带 LSB）。

**上边带（USB）**：

$$y_{USB}(t) = \frac{A_c}{2}x(t)\cos(\omega_c t) - \frac{A_c}{2}\hat{x}(t)\sin(\omega_c t)$$

其中 $\hat{x}(t)$ 是 $x(t)$ 的 **Hilbert 变换**（90° 相移后的版本）：

$$\hat{x}(t) = x(t) * \frac{1}{\pi t} = \frac{1}{\pi}\int_{-\infty}^{\infty}\frac{x(\tau)}{t-\tau}d\tau$$

**频域性质**：$\hat{x}(t)$ 的傅里叶变换为 $-j \text{sgn}(\omega) X(j\omega)$，即对正频率乘以 $-j$，对负频率乘以 $+j$。

$$Y_{USB}(j\omega) = \frac{A_c}{2}[X(j(\omega-\omega_c)) \cdot u(\omega-\omega_c) + X(j(\omega+\omega_c)) \cdot u(-\omega-\omega_c)]$$

> 💡 **频带利用率**：SSB 的带宽仅为 AM 或 DSB-SC 的一半——这在频谱资源稀缺的无线通信中至关重要。

</details>

---

## 三、角度调制（FM 与 PM）

### 🔍 把信息藏进载波的"节奏"里

**角度调制**不改变载波的幅度，只改变载波的**相位或频率**。这带来了一个重要优势：**幅度恒定** → 放大器可以在饱和区工作（效率更高），且幅度噪声不会被放大。

---

<details class="def-box" open>
<summary>📖 频率调制（FM）与相位调制（PM）</summary>

**相位调制（PM）**：

$$\phi(t) = k_p x(t)$$

$$y_{PM}(t) = A_c \cos(\omega_c t + k_p x(t))$$

相位随调制信号的瞬时值线性变化。

**频率调制（FM）**：

$$\frac{d\phi(t)}{dt} = \omega_c + k_f x(t)$$

$$\phi(t) = \omega_c t + k_f \int_{0}^{t} x(\tau) d\tau$$

$$y_{FM}(t) = A_c \cos\left(\omega_c t + k_f \int_{0}^{t} x(\tau) d\tau\right)$$

**瞬时频率**：

$$\omega_i(t) = \frac{d\phi(t)}{dt} = \omega_c + k_f x(t)$$

**FM 与 PM 的关系**：FM 是积分后的 PM，PM 是微分后的 FM（相位是频率的积分）。

</details>

<details class="def-box" open>
<summary>📖 卡森法则（Carson's Rule）：FM 带宽估算</summary>

**瞬时频率偏移**：$\Delta f = |k_f x(t)|_{\max}/(2\pi)$（Hz）

**最大频率偏移**：$\Delta f = k_f \cdot |x(t)|_{\max} / (2\pi)$

**卡森法则**（单音调制 $x(t) = \cos(\omega_m t)$ 时严格成立）：

$$B \approx 2(\Delta f + f_m)$$

其中 $f_m$ 是调制信号的最高频率。

**一般信号**：

$$B \approx 2(\Delta f + B_x)$$

其中 $B_x$ 是基带信号的带宽。

> 🎯 **直观理解**：FM 信号的频谱分布在载波两侧，"肩膀"的高度为 $\Delta f$，总宽度约为 $2(\Delta f + f_m)$。调制指数 $\beta = \Delta f / f_m$ 越大，带宽越宽。

**工程经验**：
- 商业 FM 广播：$f_c \approx 88-108$ MHz，$\Delta f = 75$ kHz，$f_m = 15$ kHz，$B \approx 2(75 + 15) = 180$ kHz（实际标准：200 kHz）
- 对讲机（窄带 FM）：$\Delta f = 2.5$ kHz，$f_m = 2.5$ kHz，$B \approx 2(2.5 + 2.5) = 10$ kHz

</details>

---

## 四、检波：把信号"取回来"

### 🔍 调制的逆过程

**检波（Demodulation）**是从已调信号中恢复原始基带信号的过程。根据调制类型的不同，检波方式也不同。

---

<details class="def-box" open>
<summary>📖 包络检波（Envelope Detection）</summary>

**适用条件**：标准 AM（$m \leq 1$），已调信号幅度随基带信号线性变化。

**工作原理**：利用二极管的单向导电性 + RC 充放电电路，追踪信号的峰值包络。

```
电路：AM信号 → [二极管] → [RC 低通] → 输出 ≈ |A_c[1+mx(t)]|
```

**包络检波的输出**：

$$\hat{x}(t) = |A_c[1 + mx(t)]| \approx A_c[1 + mx(t)] \quad (m \leq 1, \text{无过调制})$$

**缺点**：
1. 不能用于 DSB-SC（没有载波，包络不包含信息）
2. 对噪声敏感（包络是幅度，噪声直接影响幅度）
3. 需要载波与原始载波频率精确匹配

</details>

<details class="def-box" open>
<summary>📖 同步检波（Coherent Detection）</summary>

**适用条件**：所有乘积型调制（AM、DSB-SC、SSB）。

**工作原理**：用与载波**同频同相**的本地振荡器乘以已调信号，再用低通滤波器滤除高频分量。

**DSB-SC 的同步检波**：

$$y(t) \cdot 2\cos(\omega_c t) = A_c x(t) \cdot [1 + \cos(2\omega_c t)]$$

$$= A_c x(t) + A_c x(t)\cos(2\omega_c t)$$

通过低通滤波器后：

$$\hat{x}(t) = A_c x(t) \quad \text{（原始信号恢复）}$$

**SSB 的同步检波**：

$$y(t) \cdot 2\cos(\omega_c t) = A_c x(t)\cos^2(\omega_c t) - A_c\hat{x}(t)\sin(\omega_c t)\cos(\omega_c t)$$

$$= \frac{A_c}{2}x(t)[1+\cos(2\omega_c t)] - \frac{A_c}{2}\hat{x}(t)[\sin(2\omega_c t)]$$

通过低通滤波器后：$\hat{x}(t) = \frac{A_c}{2}x(t)$ ✅

**关键问题**：需要**载波同步**（载波恢复）。若频率偏移 $\Delta\omega$，会产生拍频（Beat Frequency）；若相位偏移 $\Delta\phi$，恢复信号会有衰减 $\cos(\Delta\phi)$。

> 💡 **工程实现**：载波同步通常用 **Costas 环**（锁相环 PLL 的一种变形）或 **平方环**（用于 DSB-SC）。

</details>

---

## 五、带通采样定理（欠采样）

### 🔍 采样前先"折叠"频谱

回忆奈奎斯特采样定理：$f_s > 2B$（$B$ 为基带信号最高频率）。但对于**带通信号**（频率范围在 $[f_L, f_H]$ 内），我们可以利用"折叠"效应降低采样率，节省 ADC 资源。

> 🎯 **生活类比**：你站在旋转木马的侧面观察它。如果旋转木马转得很快（高频），你的眨眼频率（采样率）不需要那么高——只要你的眨眼和木马的位置配合好，每次眨眼看到的都是"不同的侧面"，你就能推断出它转得多快。对于高频信号，你的"眨眼"（采样）也不需要达到两倍高频的速率。

---

<details class="def-box" open>
<summary>📖 定理：带通采样定理（Bandpass Sampling Theorem）</summary>

设带通信号的频率范围为 $[f_L, f_H]$，带宽为 $B = f_H - f_L$，则可以无失真重建的**最低采样率**为：

$$f_s = \frac{2f_H}{k+1}$$

其中 $k$ 为满足 $k \leq \frac{f_H}{B} - 1$ 的**最大整数**：

$$k_{\max} = \left\lfloor \frac{f_H}{B} - 1 \right\rfloor$$

**等价条件**：$f_s$ 满足：

$$\frac{2f_H}{k+1} \leq f_s \leq \frac{2f_L}{k}$$

其中 $k = 0, 1, 2, \ldots, \left\lfloor \frac{f_H}{B} - 1 \right\rfloor$

**频谱折叠图解**：

```
原始频谱：
       [-f_H    -f_L] [f_L    f_H]
负频：  ▓▓▓▓▓▓▓  ░░░░░░  正频： ░░░░░░  ▓▓▓▓▓▓▓

采样后折叠到 [0, f_s/2]:
   [0                    f_s/2]
   多次折叠叠加
```

</details>

<details class="def-box" open>
<summary>📖 频谱混叠与无混叠采样条件</summary>

**频谱折叠**：采样后，频谱在 $f_s/2$ 处折叠。当 $f_s < 2f_H$ 时，$n=1$ 的镜像频谱会与原始频谱**重叠**（混叠）。

**无混叠条件**（第 $n$ 个镜像频谱不与原始频谱重叠）：

$$f_s \geq \frac{2f_H}{n} \quad \text{且} \quad f_s \leq \frac{2f_L}{n-1} \quad (n \geq 1)$$

**最佳采样率选择**：取 $n$ 靠近 $\frac{f_H}{B}$ 的值，使 $f_s$ 最小化。

**混叠利用（故意欠采样）**：在软件无线电（SDR）等应用中，故意让高频信号混叠折叠到低频，从而用便宜的 ADC 采集高频信号。例如采集 900 MHz 的 GSM 信号时，采样率仅需几十 MHz。

</details>

---

## 六、MATLAB/Python 代码实现

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

# ============================================================
# 示例 1：AM 调制与频谱分析
# ============================================================
fs = 50000           # 采样率 50 kHz
T = 0.1              # 信号时长 0.1 秒
t = np.linspace(0, T, int(fs*T))

# 基带信号（语音/音频的低频近似：两个正弦）
fm1, fm2 = 200, 500  # 基带信号频率 Hz
x = 0.5*np.sin(2*np.pi*fm1*t) + 0.3*np.sin(2*np.pi*fm2*t)  # |x| <= 1

# 载波
fc = 10000           # 载波频率 10 kHz
Ac = 1.0

# 标准 AM（m = 0.8）
m = 0.8
y_am = Ac * (1 + m * x) * np.cos(2*np.pi*fc*t)

# DSB-SC
y_dsb = Ac * x * np.cos(2*np.pi*fc*t)

fig, axes = plt.subplots(3, 2, figsize=(14, 10))

# 基带信号时域
axes[0, 0].plot(t[:1000], x[:1000], 'b-')
axes[0, 0].set_title('Baseband Signal $x(t)$ (200Hz + 500Hz)')
axes[0, 0].set_xlabel('Time (s)')
axes[0, 0].grid(True, alpha=0.3)

# AM 调制时域
axes[0, 1].plot(t[:500], y_am[:500], 'r-', linewidth=0.8)
axes[0, 1].plot(t[:500], (1+m*x)[:500], 'g--', linewidth=0.8, label='Envelope (1+mx)')
axes[0, 1].plot(t[:500], -(1+m*x)[:500], 'g--', linewidth=0.8)
axes[0, 1].set_title(f'Standard AM (m={m})')
axes[0, 1].set_xlabel('Time (s)')
axes[0, 1].legend()
axes[0, 1].grid(True, alpha=0.3)

# DSB-SC 时域
axes[1, 0].plot(t[:500], y_dsb[:500], 'orange', linewidth=0.8)
axes[1, 0].set_title('DSB-SC Modulation')
axes[1, 0].set_xlabel('Time (s)')
axes[1, 0].grid(True, alpha=0.3)

# AM 频谱
freq = np.fft.rfftfreq(len(t), 1/fs)
X = np.fft.rfft(x)
Y_am = np.fft.rfft(y_am)
axes[1, 1].plot(freq[:5000]/1000, 20*np.log10(np.abs(Y_am)[:5000] + 1e-12), 'r-', linewidth=0.8)
axes[1, 1].set_title('AM Spectrum (note carrier at 10kHz)')
axes[1, 1].set_xlabel('Frequency (kHz)')
axes[1, 1].set_ylabel('|Y(f)| (dB)')
axes[1, 1].axvline(fc/1000, color='blue', linestyle='--', label=f'fc={fc/1000}kHz')
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3)

# DSB-SC 频谱（无载波）
Y_dsb = np.fft.rfft(y_dsb)
axes[2, 0].plot(freq[:5000]/1000, 20*np.log10(np.abs(Y_dsb)[:5000] + 1e-12), 'orange', linewidth=0.8)
axes[2, 0].set_title('DSB-SC Spectrum (no carrier!)')
axes[2, 0].set_xlabel('Frequency (kHz)')
axes[2, 0].set_ylabel('|Y(f)| (dB)')
axes[2, 0].grid(True, alpha=0.3)

# 基带频谱
axes[2, 1].plot(freq[:2000]/1000, 20*np.log10(np.abs(X)[:2000] + 1e-12), 'b-', linewidth=0.8)
axes[2, 1].set_title('Baseband Spectrum $X(f)$')
axes[2, 1].set_xlabel('Frequency (kHz)')
axes[2, 1].set_ylabel('|X(f)| (dB)')
axes[2, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('/workspace/ch8_am_modulation.png', dpi=150)
plt.close()
print("AM 调制频谱图已保存到 /workspace/ch8_am_modulation.png")

# ============================================================
# 示例 2：FM 调制与带宽
# ============================================================
# FM 参数
fc_fm = 10000       # 载波 10 kHz
kf = 5000           # 频偏常数（Hz/V）
x_fm = 0.5*np.sin(2*np.pi*fm1*t) + 0.3*np.sin(2*np.pi*fm2*t)

# FM 积分相位
phi = 2*np.pi*fc_fm*t + 2*np.pi*kf*np.cumsum(x_fm)/fs
y_fm = Ac * np.cos(phi)

# 瞬时频率
inst_freq = fc_fm + kf * x_fm
delta_f = kf * np.max(np.abs(x_fm))
fm_index = delta_f / max(fm1, fm2)

# 卡森法则
B_carson = 2 * (delta_f + max(fm1, fm2))

print(f"\nFM 参数：")
print(f"  载波频率 fc = {fc_fm/1000} kHz")
print(f"  频偏 Δf = {delta_f/1000:.1f} kHz")
print(f"  调制指数 β = {fm_index:.2f}")
print(f"  卡森法则带宽 B ≈ {B_carson/1000:.1f} kHz")

fig, axes = plt.subplots(3, 1, figsize=(14, 9))

axes[0].plot(t[:500], x_fm[:500], 'b-')
axes[0].set_title('Modulating Signal $x(t)$')
axes[0].set_xlabel('Time (s)')
axes[0].grid(True, alpha=0.3)

axes[1].plot(t[:500], y_fm[:500], 'r-', linewidth=0.7)
axes[1].set_title(f'FM Modulated Signal (Δf={delta_f/1000:.1f}kHz, β={fm_index:.2f})')
axes[1].set_xlabel('Time (s)')
axes[1].grid(True, alpha=0.3)

axes[2].plot(t[:500], inst_freq[:500]/1000, 'g-')
axes[2].axhline(fc_fm/1000, color='blue', linestyle='--', label=f'fc={fc_fm/1000}kHz')
axes[2].axhline((fc_fm+delta_f)/1000, color='red', linestyle=':', label=f'+Δf')
axes[2].axhline((fc_fm-delta_f)/1000, color='red', linestyle=':', label=f'-Δf')
axes[2].set_title('Instantaneous Frequency')
axes[2].set_xlabel('Time (s)')
axes[2].set_ylabel('Frequency (kHz)')
axes[2].legend()
axes[2].grid(True, alpha=0.3)
axes[2].set_ylim(0, 20)

plt.tight_layout()
plt.savefig('/workspace/ch8_fm_modulation.png', dpi=150)
plt.close()
print("FM 调制图已保存到 /workspace/ch8_fm_modulation.png")

# ============================================================
# 示例 3：同步检波（Coherent Detection）
# ============================================================
# 用 DSB-SC 信号演示同步检波
carrier = 2*np.cos(2*np.pi*fc*t)
product = y_dsb * carrier
# 低通滤波
b_lpf, a_lpf = signal.butter(8, 2*fm2/fs, btype='low')
x_recovered = signal.lfilter(b_lpf, a_lpf, product)

fig, axes = plt.subplots(3, 1, figsize=(12, 8))

axes[0].plot(t[:1000], x[:1000], 'b-')
axes[0].set_title('Original Baseband Signal $x(t)$')
axes[0].set_xlabel('Time (s)')
axes[0].grid(True, alpha=0.3)

axes[1].plot(t[:1000], product[:1000], 'orange', linewidth=0.6)
axes[1].set_title('After Multiplication by $2\cos(\omega_c t)$ (before LPF)')
axes[1].set_xlabel('Time (s)')
axes[1].grid(True, alpha=0.3)

axes[2].plot(t[:1000], x_recovered[:1000], 'g-')
axes[2].plot(t[:1000], 0.5*x[:1000], 'b--', alpha=0.5, label='Original (scaled)')
axes[2].set_title('Recovered Signal after LPF (Coherent Detection)')
axes[2].set_xlabel('Time (s)')
axes[2].legend()
axes[2].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('/workspace/ch8_coherent_detection.png', dpi=150)
plt.close()
print("同步检波图已保存到 /workspace/ch8_coherent_detection.png")

# ============================================================
# 示例 4：带通采样定理演示
# ============================================================
# 假设接收到的 RF 信号：900 MHz GSM 频段
fL = 890e6       # 下边 890 MHz
fH = 915e6       # 上边 915 MHz
B = fH - fL      # 带宽 25 MHz

print(f"\n=== 带通采样计算 ===")
print(f"信号频率范围: [{fL/1e6:.0f}, {fH/1e6:.0f}] MHz")
print(f"带宽 B = {B/1e6:.0f} MHz")

# 计算最大允许的 k
k_max = int(fH / B - 1)
print(f"k_max = floor({fH/B:.2f} - 1) = {k_max}")

# 列出所有可行的采样率范围
print(f"\n可行的采样率范围:")
for k in range(0, k_max + 1):
    if k == 0:
        f_low = 2*fH
        print(f"  k={k}: f_s > {f_low/1e6:.1f} MHz")
    else:
        f_low = 2*fH/(k+1)
        f_high = 2*fL/k
        if f_low < f_high:
            print(f"  k={k}: {f_low/1e6:.2f} MHz ≤ f_s ≤ {f_high/1e6:.2f} MHz")

# 选用合理的采样率（比如 26 MHz —— GSM 常用采样率）
fs_rf = 26e6
print(f"\n选用 f_s = {fs_rf/1e6:.0f} MHz（符合 k=34 的范围）")

# 采样后信号的中心频率
f_center = (fL + fH) / 2
alias_center = f_center % fs_rf
print(f"原始中心频率: {f_center/1e6:.1f} MHz")
print(f"折叠后中心频率: {alias_center/1e6:.1f} MHz")

# ============================================================
# 示例 5：SSB 调制（Hilbert 变换实现）
# ============================================================
from scipy.signal import hilbert

# 用 Hilbert 变换实现 SSB
x_hilbert = hilbert(x)  # 返回 x + j*hat(x)
hat_x = np.imag(x_hilbert)  # 取虚部得到 Hilbert 变换

# SSB（上边带）：y = x*cos + hat_x*sin
y_ssb = 0.5 * x * np.cos(2*np.pi*fc*t) - 0.5 * hat_x * np.sin(2*np.pi*fc*t)

# 比较 DSB-SC 和 SSB 的频谱
X = np.fft.rfft(x)
Y_dsb = np.fft.rfft(y_dsb)
Y_ssb = np.fft.rfft(y_ssb)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 8))

ax1.plot(freq[:5000]/1000, 20*np.log10(np.abs(Y_dsb)[:5000] + 1e-12),
         'orange', linewidth=0.8, label='DSB-SC')
ax1.set_title('DSB-SC Spectrum (upper+lower sidebands)')
ax1.set_xlabel('Frequency (kHz)')
ax1.set_ylabel('|Y(f)| (dB)')
ax1.axvline(fc/1000, color='blue', linestyle='--', label='Carrier')
ax1.legend()
ax1.grid(True, alpha=0.3)

ax2.plot(freq[:5000]/1000, 20*np.log10(np.abs(Y_ssb)[:5000] + 1e-12),
         'green', linewidth=0.8, label='SSB (USB only)')
ax2.set_title('SSB (Upper Sideband) Spectrum — half the bandwidth!')
ax2.set_xlabel('Frequency (kHz)')
ax2.set_ylabel('|Y(f)| (dB)')
ax2.axvline(fc/1000, color='blue', linestyle='--', label='Carrier')
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('/workspace/ch8_ssb_modulation.png', dpi=150)
plt.close()
print("SSB 调制图已保存到 /workspace/ch8_ssb_modulation.png")

# ============================================================
# 示例 6：AM 与 FM 的噪声性能对比
# ============================================================
np.random.seed(99)
snr_db = 10  # 信噪比 10 dB

def add_awgn(signal, snr_db):
    """加高斯白噪声"""
    power_db = 10*np.log10(np.mean(signal**2))
    noise_power_db = power_db - snr_db
    noise_power = 10**(noise_power_db/10)
    noise = np.sqrt(noise_power) * np.random.randn(len(signal))
    return signal + noise

# 加噪声
y_am_noisy = add_awgn(y_am, snr_db)
y_fm_noisy = add_awgn(y_fm, snr_db)

# FM 抗噪声优势：FM 对幅度噪声不敏感（因为信息在频率里）
fig, axes = plt.subplots(2, 2, figsize=(14, 8))

axes[0, 0].plot(t[:500], y_am[:500], 'b-', linewidth=0.8)
axes[0, 0].set_title('AM (Clean)')
axes[0, 0].grid(True, alpha=0.3)

axes[0, 1].plot(t[:500], y_am_noisy[:500], 'r-', linewidth=0.5)
axes[0, 1].set_title(f'AM (SNR={snr_db}dB, amplitude noise visible)')
axes[0, 1].grid(True, alpha=0.3)

axes[1, 0].plot(t[:500], y_fm[:500], 'b-', linewidth=0.8)
axes[1, 0].set_title('FM (Clean)')
axes[1, 0].grid(True, alpha=0.3)

axes[1, 1].plot(t[:500], y_fm_noisy[:500], 'orange', linewidth=0.5)
axes[1, 1].set_title('FM (Same SNR, noise mostly in amplitude — FM ignores it!)')
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('/workspace/ch8_am_vs_fm_noise.png', dpi=150)
plt.close()
print("AM vs FM 噪声对比图已保存")
print("\n注：FM 信号虽然幅度也被噪声干扰，但由于信息在频率中，检波后的噪声性能远优于 AM。")
```

---

## 🎯 章节练习

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 已知 AM 信号 $y(t) = 10[1+0.5\cos(2\pi \cdot 1000t)]\cos(2\pi \cdot 100000t)$，求调制指数、载波频率、包络峰值 |
| 2 | 分析题 | ⭐⭐⭐ | 用傅里叶变换证明 AM 信号在载波两侧各有一个基带频谱的镜像 |
| 3 | 计算题 | ⭐⭐ | 设计一个带通采样方案：信号频率范围 88-108 MHz（FM 广播），求满足无混叠的最小采样率，并给出 2 个可行方案 |
| 4 | 证明题 | ⭐⭐⭐ | 证明同步检波中，若本地振荡器有相位误差 $\Delta\phi$，则恢复信号衰减为 $\cos(\Delta\phi)$ |
| 5 | 综合题 | ⭐⭐⭐⭐ | 某模拟通信系统使用 DSB-SC，调制信号 $x(t)$ 带宽 $B=4$ kHz，载波频率 $f_c = 100$ kHz。请：(1) 推导已调信号的带宽；(2) 设计同步检波器（给出载波恢复和低通滤波方案）；(3) 若改用 SSB，带宽如何变化？ |

---

## 🚀 学科总结

本章建立了**通信系统**的信号变换基础：

- **调制**的本质是**频谱搬移**——把基带信号"搬运"到高频载波两侧
- **AM 系列**：标准 AM（含载波，可包络检波）→ DSB-SC（无载波，功率效率高）→ SSB（单边带，带宽利用率最高）
- **FM/PM**：角度调制，以频率/相位承载信息，幅度恒定 → 天然抗幅度噪声
- **卡森法则**给出了 FM 带宽的快速估算：$B \approx 2(\Delta f + f_m)$
- **同步检波**是所有 DSB-SC/SSB 的标准恢复方式，但需要精确的载波同步
- **带通采样**让高速 RF 信号可以用低速 ADC 采集（SDR 的核心技术）

恭喜你完成了**信号与系统**全部 8 章的学习！从时域到频域，从连续到离散，从系统分析到滤波器设计，再到通信调制——你已经掌握了信号与系统的完整知识体系！
