# 第4章：离散时间傅里叶变换与采样定理

> **本章简介**：本章是连续与离散世界的"桥梁"。首先建立离散时间信号的频域表示工具——**离散时间傅里叶变换（DTFT）**，理解其周期性与共轭对称性。然后揭示信号处理中最核心的定理之一：**奈奎斯特-香农采样定理**——为什么数字音频要用 44.1kHz 采样？采样过程中为何会产生混叠？如何完美重建原始信号？最后介绍 **DFT 与 FFT** 的联系，理解频域采样的实际计算方法。
>
> ⏱ 预估学时：5 小时 | 难度：⭐⭐⭐⭐ | 📍 前置：第2章（连续傅里叶变换）、第3章（离散系统）

---

## 一、离散时间傅里叶变换（DTFT）

### 🔍 通俗理解

**DTFT** 是离散时间信号的"频谱仪"。如果说傅里叶变换把连续信号映射到连续频率轴，DTFT 则把离散信号映射到**连续但周期**的频率轴。这是因为离散序列在时间上是无限延伸的，其频谱在频率上是**天然的周期函数**。

> 🎯 **生活类比**：想象把一张 CD 音频（离散采样）放进频谱分析仪。它会显示一张频谱图——但注意，频谱图会从低频到高频（0 到 22kHz），超过 22kHz 后频谱会"折叠回来"（因为采样率的限制）。这就是 DTFT 周期性的体现。

---

<details class="def-box" open>
<summary>📖 定义 1：DTFT 与逆 DTFT</summary>

**离散时间傅里叶变换**（Discrete-Time Fourier Transform）：

$$X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n] \, e^{-j\omega n}$$

**逆 DTFT**：

$$x[n] = \frac{1}{2\pi} \int_{-\pi}^{\pi} X(e^{j\omega}) \, e^{j\omega n} \, d\omega$$

**重要特点**：
- $X(e^{j\omega})$ 是**周期函数**，周期为 $2\pi$（因为 $e^{-j(\omega+2\pi)n} = e^{-j\omega n}$）
- $\omega$ 是**归一化数字频率**，单位：rad/sample（弧度/采样）
- $\omega = 2\pi$ 对应采样频率 $f_s$（即 1 个完整周期）

**与连续傅里叶变换的区别**：

| | 连续 FT | DTFT |
|---|---|---|
| 时域 | $x(t)$，连续 | $x[n]$，离散 |
| 频域 | $X(j\omega)$，连续 | $X(e^{j\omega})$，**周期连续** |
| 频率范围 | $(-\infty, \infty)$ | $[-\pi, \pi]$ 或 $[0, 2\pi]$ |

</details>

<details class="def-box" open>
<summary>📖 定义 2：DTFT 的周期性</summary>

DTFT 的**周期性**是离散信号频域分析的核心性质：

$$X(e^{j(\omega + 2\pi)}) = X(e^{j\omega}), \quad \forall \omega \in \mathbb{R}$$

**原因**：$e^{-j\omega n}$ 是 $\omega$ 的 $2\pi$ 周期函数，$n$ 为整数。

**推论**：分析离散信号频谱只需关注 $[-\pi, \pi]$ 或 $[0, 2\pi]$ 区间。超过这个范围的频率会"折返"。

> 🎯 **生活类比**：想象走在一个圆形跑道上——每走 $2\pi$ 步（一个完整圈），你回到出发点。DTFT 的频率轴就是这样一条"圆形跑道"，$\omega$ 从 $-\pi$ 到 $+\pi$ 已经包含了所有唯一的频率信息。

</details>

<details class="def-box" open>
<summary>📖 定义 3：DTFT 的共轭对称性</summary>

**实序列的共轭对称性**：

若 $x[n]$ 是**实序列**（$x[n] \in \mathbb{R}$），则：

$$X(e^{j\omega}) = X^*(e^{j\omega}) \quad \text{（共轭对称）}$$

**含义**：
- 幅度谱是**偶函数**：$|X(e^{j\omega})| = |X(e^{-j\omega})|$
- 相位谱是**奇函数**：$\angle X(e^{j\omega}) = -\angle X(e^{-j\omega})$
- 实信号的频谱在正负频率上互为镜像（**双边频谱的对称性**）

**物理意义**：实信号的负频率不是"假频率"，而是正弦/余弦信号的数学表示（$\cos\omega t = \frac{e^{j\omega t}+e^{-j\omega t}}{2}$）。

```python
import numpy as np
import matplotlib.pyplot as plt

# 有限长实序列及其DTFT
n = np.arange(-10, 11)  # n = -10,...,0,...,10
x = np.exp(-0.2 * np.abs(n))  # 实序列（偶对称）
x[10] = 2  # 中心峰值

# 数值DTFT
omega = np.linspace(-3*np.pi, 3*np.pi, 2000)
X = np.zeros(len(omega), dtype=complex)
for i, w in enumerate(omega):
    X[i] = np.sum(x * np.exp(-1j * w * n))

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 7))
ax1.plot(omega, np.abs(X), 'b-')
ax1.set_title('幅度谱 |X(e^{jω})| — 偶对称'); ax1.set_ylabel('|X|')
ax1.grid(True); ax1.axvline(x=-np.pi, color='r', ls='--', alpha=0.5)
ax1.axvline(x=np.pi, color='r', ls='--', alpha=0.5, label='ω=±π')
ax1.legend()
ax2.plot(omega, np.angle(X), 'r-')
ax2.set_title('相位谱 ∠X(e^{jω}) — 奇对称'); ax2.set_ylabel('相位 (rad)')
ax2.set_xlabel('ω (rad/sample)'); ax2.grid(True)
ax2.axvline(x=-np.pi, color='gray', ls='--', alpha=0.5)
ax2.axvline(x=np.pi, color='gray', ls='--', alpha=0.5)
ax2.set_xlim(-3*np.pi, 3*np.pi)
plt.tight_layout(); plt.savefig('/workspace/signals_ch4_dtft.png', dpi=120)
print("DTFT图已保存（可见周期性）")
```

</details>

---

## 二、采样定理：连续到离散的桥梁

### 🔍 通俗理解

**采样定理**回答了一个根本问题：连续信号到底需要采多少个点，才能"完美重建"而不丢失信息？答案惊人地简洁：**采样频率必须大于信号最高频率的 2 倍**（即 $f_s > 2f_m$）。这就是 CD 音频为什么用 44.1kHz 采样（人耳能听到的最高频率约 20kHz，$2\times20\text{kHz}=40\text{kHz}$，留余量定为 44.1kHz）。

> 🎯 **生活类比**：想象你在用相机拍摄旋转的自行车轮。如果自行车转得很快（高频），而相机快门速度很慢（采样率低），拍出来的照片里车轮看起来像是向后转（**混叠**）。要让车轮看起来正常旋转，快门速度必须至少是轮子转速的 2 倍。

---

<details class="def-box" open>
<summary>📖 定义 4：采样过程（连续→离散）</summary>

从连续信号 $x_c(t)$ 到离散序列 $x[n]$ 的采样过程：

$$x[n] = x_c(nT_s) = x_c(n/f_s)$$

其中：
- $T_s$：**采样周期**（秒/sample）
- $f_s = 1/T_s$：**采样频率**（samples/秒，Hz）

**采样后的频谱**（连续 FT 的频域关系）：

若 $x_c(t) \xrightarrow{\mathcal{F}} X_c(j\Omega)$，则采样后序列的 DTFT 为：

$$X(e^{j\omega}) = \frac{1}{T_s} \sum_{k=-\infty}^{\infty} X_c\left(j\frac{\omega - 2\pi k}{T_s}\right)$$

**关键发现**：采样后，频谱在 $\omega$ 轴上**以 $2\pi$ 为周期重复**——这是因为离散信号天然具有频谱周期性。

> ⚠️ **频谱周期延拓**是采样的核心效应：原始连续信号的频谱 $X_c(j\Omega)$ 被"复制粘贴"了无穷多份，间隔为 $\omega = 2\pi$（对应 $\Omega = \Omega_s = 2\pi f_s$）。

</details>

<details class="def-box" open>
<summary>📖 定义 5：奈奎斯特-香农采样定理</summary>

**奈奎斯特-香农采样定理**：

设连续信号 $x_c(t)$ 是**带限信号**，即 $X_c(j\Omega) = 0$ for $|\Omega| > \Omega_m$（最高角频率为 $\Omega_m = 2\pi f_m$）。

若采样频率满足：

$$f_s > 2f_m \quad \Leftrightarrow \quad \Omega_s = 2\pi f_s > 2\Omega_m$$

即采样频率**大于信号最高频率的 2 倍**，则 $x_c(t)$ 可以**从其采样 $x[n]$ 完美重建**。

**奈奎斯特率**：$f_s = 2f_m$ 是最低可行采样率（**奈奎斯特率**）。
**奈奎斯特频率**：$f_s/2$ 是最高可无失真重建的频率（也叫**折叠频率**）。

**不满足 $f_s > 2f_m$ 时**：发生**混叠（Aliasing）**，信号无法重建。

</details>

<details class="def-box" open>
<summary>📖 定义 6：混叠（Aliasing）现象</summary>

**混叠**发生在 $f_s \leq 2f_m$ 时。频谱的周期性延拓发生**重叠**，原始频谱信息被破坏：

```
原始频谱:    [-fm ---- 0 ---- +fm]
采样频谱:    [-fs/2 ---- 0 ---- +fs/2]  (重复)
混叠:        频谱重叠 → 高频变低频
```

**混叠频率计算**：

当真实频率 $f > f_s/2$ 时，混叠后的"感知频率"为：

$$f_a = |f - k f_s|, \quad k = \text{使 } |f_a| < f_s/2 \text{ 的整数}$$

**经典例子**：电影中车轮倒转效应。车轮旋转频率 $f_w$（Hz），采样率（帧率）$f_s$（fps）。当 $f_w > f_s/2$ 时，车轮看起来向后转。

```python
import numpy as np
import matplotlib.pyplot as plt

# 混叠现象演示
fs = 1000  # 采样率 1000 Hz
Ts = 1/fs
t = np.arange(0, 0.02, 1/fs)

# 原始信号：高频正弦
f1 = 100  # 100 Hz
f2 = 900  # 900 Hz（> fs/2=500 Hz，会混叠）
x1 = np.sin(2*np.pi*f1*t)
x2 = np.sin(2*np.pi*f2*t)

# 混叠后的等效频率
f_alias = abs(f2 - fs)  # = 100 Hz（和100Hz混叠！）
x2_alias = np.sin(2*np.pi*f_alias*t)

fig, axes = plt.subplots(2, 1, figsize=(12, 6))
axes[0].plot(t*1000, x1, 'b-', label=f'f={f1}Hz 原始信号')
axes[0].plot(t*1000, x2, 'r--', alpha=0.5, label=f'f={f2}Hz 高频信号')
axes[0].set_title('两个不同频率的正弦波'); axes[0].legend(); axes[0].grid(True)
axes[1].plot(t*1000, x1, 'b-', label=f'f={f1}Hz 原始')
axes[1].plot(t*1000, x2_alias, 'r--', label=f'f_alias={f_alias}Hz 混叠后（900Hz→100Hz）')
axes[1].set_title('混叠：900Hz 被"误认为"100Hz（采样率=1000Hz）')
axes[1].legend(); axes[1].grid(True)
for ax in axes:
    ax.set_xlabel('时间 (ms)'); ax.set_xlim(0, 20)
plt.tight_layout(); plt.savefig('/workspace/signals_ch4_aliasing.png', dpi=120)
print("混叠现象图已保存")
```

</details>

---

## 三、信号重建

### 🔍 通俗理解

采样定理说满足条件时可以完美重建，但"如何重建"？答案是一个**低通滤波**操作——用理想的重建滤波器把原始频谱从采样后的重复频谱中"提取"出来。这个滤波器的作用相当于在时域做**sinc 函数插值**。

---

<details class="def-box" open>
<summary>📖 定义 7：理想重建公式</summary>

**理想重建**（零阶保持 + sinc 内插）：

从采样 $x[n]$ 重建连续信号：

$$x_c(t) = \sum_{n=-\infty}^{\infty} x[n] \, \text{sinc}\left(\frac{t - nT_s}{T_s}\right)$$

其中 $\text{sinc}(x) = \frac{\sin(\pi x)}{\pi x}$（归一化 sinc，注意与 $\frac{\sin x}{x}$ 的区别）。

**推导**：在频域，理想重建滤波器是带宽为 $f_s/2$ 的低通滤波器：

$$H_r(j\Omega) = \begin{cases} T_s & |\Omega| \leq \Omega_s/2 \\ 0 & |\Omega| > \Omega_s/2 \end{cases}$$

频域相乘（采样频谱 × 理想低通）→ 提取原始频谱 → 逆变换得到上式。

**实现方式**：实际上用 ** sinc 内插** 或 **零阶保持 + 模拟低通**。

> 🎯 **生活类比**：采样后的离散序列像是珍珠项链的散落珍珠（$x[n]$），重建就是在珍珠之间用一条完美的曲线（sinc 插值函数）将它们串起来。这条曲线在每颗珍珠位置精确穿过珍珠点，在其他珍珠位置恰好为零。

</details>

<details class="proof-box" open>
<summary>📐 重建公式的频域推导</summary>

**Step 1**：采样后序列的 DTFT：

$$X(e^{j\omega}) = \frac{1}{T_s} \sum_{k=-\infty}^{\infty} X_c\left(j\frac{\omega - 2\pi k}{T_s}\right)$$

**Step 2**：理想重建滤波器的频率响应（截止频率 $\omega_c = \pi$，即 $\Omega_c = \Omega_s/2$）：

$$H_r(e^{j\omega}) = \begin{cases} T_s & |\omega| \leq \pi \\ 0 & \pi < |\omega| < \pi \end{cases} \quad \text{（仅保留 k=0 的原始频谱）}$$

**Step 3**：逆 DTFT：

$$x[n] = \frac{1}{2\pi}\int_{-\pi}^{\pi} T_s X_c(j\Omega/T_s) e^{j\omega n} d\omega = x_c(nT_s)$$

对应时域关系即为 sinc 内插公式。

</details>

---

## 四、离散傅里叶变换（DFT）与 FFT

### 🔍 通俗理解

**DFT** 是 DTFT 的"数值计算版本"——它把无限长或很长的序列限制在有限长度 $N$ 上，并对连续频率轴也做离散化，变成 $N$ 个频率点。**FFT**（快速傅里叶变换）是计算 DFT 的高效算法（复杂度从 $O(N^2)$ 降到 $O(N\log N)$），是数字信号处理历史上最重要的算法之一。

> 🎯 **生活类比**：DFT 像是在频谱仪上设置"频道数"（$N$ 个频率bins），每次你看到的不是完整的连续频谱，而是有限的"频率频道"。FFT 就是快速切换这些频道的方法——原本要逐个频道调谐（很慢），FFT 可以一次扫一片（很快）。

---

<details class="def-box" open>
<summary>📖 定义 8：DFT 与逆 IDFT</summary>

对长度为 $N$ 的有限长序列 $x[n],\ n=0,1,...,N-1$：

**DFT（离散傅里叶变换）**：

$$X[k] = \sum_{n=0}^{N-1} x[n] \, e^{-j\frac{2\pi}{N} kn}, \quad k = 0, 1, \ldots, N-1$$

**逆 IDFT**：

$$x[n] = \frac{1}{N} \sum_{k=0}^{N-1} X[k] \, e^{j\frac{2\pi}{N} kn}, \quad n = 0, 1, \ldots, N-1$$

**$W_N$ 表示法**：令 $W_N = e^{-j2\pi/N}$，则：

$$X[k] = \sum_{n=0}^{N-1} x[n] \, W_N^{kn}, \quad x[n] = \frac{1}{N}\sum_{k=0}^{N-1} X[k] \, W_N^{-kn}$$

**DFT 与 DTFT 的关系**：
$$X[k] = X(e^{j\omega})\Big|_{\omega = \frac{2\pi}{N}k}$$

即：DFT 在 $N$ 个等间隔频率点 $\{0, \frac{2\pi}{N}, \frac{4\pi}{N}, ..., 2\pi-\frac{2\pi}{N}\}$ 上对 DTFT 采样。

```python
import numpy as np
import matplotlib.pyplot as plt

# DFT 示例：有限长序列的频谱分析
N = 64  # DFT 点数
n = np.arange(N)
x = np.sin(2*np.pi * 4 * n / N) + 0.5 * np.sin(2*np.pi * 12 * n / N)  # 两个正弦合成

# 计算 DFT
X = np.fft.fft(x)
freq_bins = np.fft.fftfreq(N)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 7))
ax1.plot(n, x, 'b-o', markersize=3)
ax1.set_title(f'时域信号 x[n]（N={N} 点）'); ax1.grid(True)
ax2.plot(freq_bins[:N//2], np.abs(X[:N//2]), 'r-o', markersize=3)
ax2.set_title('DFT 幅度谱 |X[k]|（仅显示正频率）')
ax2.set_xlabel('归一化频率 (cycles/sample)'); ax2.grid(True)
ax2.set_xlim(0, 0.5)
# 标注频率位置
ax2.axvline(x=4/N, color='green', linestyle='--', label=f'f={4/N} (4 cycles/N)')
ax2.axvline(x=12/N, color='purple', linestyle='--', label=f'f={12/N} (12 cycles/N)')
ax2.legend()
plt.tight_layout(); plt.savefig('/workspace/signals_ch4_dft.png', dpi=120)
print("DFT图像已保存")
```

</details>

<details class="def-box" open>
<summary>📖 定义 9：FFT 算法原理</summary>

**FFT**（Fast Fourier Transform）不是一种新的变换，而是计算 DFT 的**高效算法**。

**复杂度对比**：
- 直接计算 DFT：$O(N^2)$ 次复数乘法
- FFT（基-2 Radix-2）：$O(N \log_2 N)$ 次复数乘法

**当 $N=1024$ 时**：直接法需要约 100 万次乘法，FFT 只需约 1 万次（快 100 倍！）

**基-2 DIT-FFT 原理**（时分FFT）：
- 将 $N$ 点 DFT 分解为两个 $N/2$ 点 DFT
- 递归分解，直到 2 点 DFT
- 利用 $W_N^{k+N/2} = -W_N^k$ 减少计算量

**DFT 的频率分辨率**：$\Delta f = \frac{f_s}{N}$（点数越多，分辨率越高）
- 频率分辨率与**信号长度**（$N$）成正比，与**采样率**成反比

</details>

---

## 五、频域采样与窗函数

<details class="def-box" open>
<summary>📖 定义 10：频域采样定理</summary>

**时域采样对应频域周期延拓，频域采样对应时域周期延拓**（对偶原理）。

对有限长序列 $x[n]$（长度为 $L$）做 $N$ 点 DFT 分析时：

- **若 $N \geq L$**：时域补零 → 频域插值（更精细的频谱）
- **若 $N < L$**：时域截断 → 频域卷积窗函数 → **频谱泄漏**

**频谱泄漏**（Spectral Leakage）：频域采样不足（截断）导致能量泄漏到相邻频率 bin。

**缓解方法**：使用**窗函数**（Hamming、Hanning、Blackman 等）代替矩形截断。

$$x_w[n] = x[n] \cdot w[n]$$

常见窗函数的对比：

| 窗函数 | 主瓣宽度 | 旁瓣衰减 | 适用场景 |
|---|---|---|---|
| 矩形窗 | $4\pi/N$ | -13dB | 分辨率优先 |
| Hamming | $8\pi/N$ | -43dB | 通用 |
| Hanning | $8\pi/N$ | -31dB | 通用 |
| Blackman | $12\pi/N$ | -57dB | 旁瓣抑制优先 |

```python
import numpy as np
import matplotlib.pyplot as plt

N = 256
n = np.arange(N)
# 信号：两个接近的频率
x = np.sin(2*np.pi*30*n/N) + 0.5*np.sin(2*np.pi*35*n/N)

# 不同窗函数的频谱对比
windows = {
    '矩形窗': np.ones(N),
    'Hamming': np.hamming(N),
    'Hanning': np.hanning(N),
    'Blackman': np.blackman(N),
}

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(13, 8))
ax1.plot(n, x, 'b-', alpha=0.7); ax1.set_title('原始信号')
freq = np.fft.fftfreq(N)
for name, w in windows.items():
    Xw = np.fft.fft(x * w)
    ax2.plot(freq[:N//2], np.abs(Xw[:N//2]), label=name, alpha=0.7)
ax2.set_title('不同窗函数的频谱对比（可见泄漏抑制）')
ax2.set_xlabel('归一化频率'); ax2.legend(); ax2.set_xlim(0, 0.3); ax2.grid(True)
plt.tight_layout(); plt.savefig('/workspace/signals_ch4_windows.png', dpi=120)
print("窗函数对比图已保存")
```

</details>

---

## 六、综合应用：数字音频系统

<details class="def-box" open>
<summary>📖 应用实例：数字音频信号链</summary>

**CD 音频系统**是采样定理的完美应用：

1. **抗混叠滤波**：录音前，用低通滤波器把 $>22.05\text{kHz}$ 的声音过滤掉（防止混叠）
2. **采样**：以 $f_s = 44.1\text{kHz}$ 采样（$2 \times 20\text{kHz} = 40\text{kHz}$，取 44.1kHz）
3. **量化**：每个采样点量化为 16-bit（65536 个等级）
4. **存储/传输**：数字编码存储
5. **重建**：DAC（数模转换器）将数字信号变回模拟
6. **平滑滤波**：模拟低通滤波器去除高频镜像（$\omega > \pi$ 的重复频谱）

**数据率**：CD 音频 $= 44.1\text{kHz} \times 16\text{bit} \times 2\text{声道} \approx 1.41\text{Mbps}$

**高分辨率音频**（192kHz/24bit）：更高的 $f_s$ 和量化精度，更宽的频响范围。

</details>

---

## 练习题

1. **（DTFT 计算）** 求序列 $x[n] = a^n u[n]$（$|a|<1$）的 DTFT $X(e^{j\omega})$，并给出 $|X(e^{j\omega})|$ 的表达式。

2. **（采样定理）** 一段音乐包含 $0\sim 20\text{kHz}$ 的频率分量，若用 $f_s = 44.1\text{kHz}$ 采样，会产生混叠吗？若混叠，求频率 $f=23\text{kHz}$ 的信号被混叠后的等效频率。

3. **（重建）** 已知采样序列 $x[n] = \sin(2\pi \cdot 0.1 n)$，采样率 $f_s = 1000\text{Hz}$，写出 $t=0.5\text{ms}$ 和 $t=1.5\text{ms}$ 时刻的重建值（用 sinc 内插公式）。

4. **（DFT 计算）** 计算 4 点序列 $x = [1, 2, 3, 4]$ 的 DFT $X[k]$，手工验证 $X[0]$ 和 $X[2]$。

5. **（FFT 复杂度）** 计算用 FFT 计算 1024 点 DFT 比直接计算快多少倍？用 $N=1024$ 代入 $O(N^2)$ 和 $O(N\log_2 N)$。

6. **（频谱泄漏）** 用矩形窗和 Hamming 窗对 $x[n] = \cos(2\pi \cdot 0.25 n)$（$N=64$ 点）做频谱分析，观察旁瓣差异，并解释原因。

---

> 💡 **本章小结**：本章建立了连续与离散信号处理的核心框架。DTFT 是离散信号频域分析的理论基础，采样定理（$f_s > 2f_m$）是数字信号处理最重要的定理之一，它决定了模拟信号数字化时需要多高的采样率。DFT 和 FFT 则解决了"如何在计算机上实际计算频谱"的问题——FFT 是现代数字信号处理的基石算法。
