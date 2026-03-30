# 第7章：滤波器设计

> **本章简介**：滤波器是信号处理的核心工具——它让某些频率分量通过（通带），阻止另一些频率分量（阻带）。本章从滤波器的分类出发，对比**理想滤波器**（矩形频率响应，永远无法实现）与**实际滤波器**（需要权衡过渡带、纹波、阶数）。重点学习模拟滤波器（Butterworth、Chebyshev、椭圆滤波器）和数字滤波器（FIR 窗函数法、双线性变换法）的设计原理与代码实现。掌握滤波器的"频率变换"思想——先设计低通原型，再变换到其他类型。
>
> ⏱ 预估学时：5 小时 | 难度：⭐⭐⭐⭐ | 📍 前置：Z 变换（第6章）、频率响应、拉普拉斯变换（第5章）

---

## 一、滤波器的基本类型

### 🔍 什么是滤波？

**滤波（Filtering）**的本质是"选择性放大或衰减"——让某些频率通过，另一些频率被抑制或减弱。这就像音乐厅的声学处理：低音（低频）太强就把低频吸收一些，高音（高频）太刺耳就把高频过滤一些。

**滤波器**是实现滤波功能的系统，其频率响应 $H(j\Omega)$（模拟）或 $H(e^{j\omega})$（数字）决定了滤波特性。

> 🎯 **生活类比**：把滤波器想象成一个"音控调节器"——低通就是"只留低音"（切掉高频尖刺），高通就是"只留高音"（消掉低频轰鸣），带通就是"只留中间那个频段"（比如人声）。理想情况下，这些调节是"砖墙式"的——绝对干净；但现实中总是有"过渡带"，像山坡一样缓缓过渡。

---

<details class="def-box" open>
<summary>📖 定义：四种基本滤波器类型</summary>

| 类型 | 英文 | 通过频率 | 典型应用 |
|------|------|---------|---------|
| **低通滤波器（LPF）** | Lowpass | $0 \leq |\Omega| \leq \Omega_c$ | 抗混叠、去高频噪声 |
| **高通滤波器（HPF）** | Highpass | $|\Omega| \geq \Omega_c$ | 去直流分量、提取尖沿 |
| **带通滤波器（BPF）** | Bandpass | $\Omega_1 \leq |\Omega| \leq \Omega_2$ | 选频放大、通信信道 |
| **带阻滤波器（BSF）** | Bandstop | $0 \leq |\Omega| \leq \Omega_1$，$|\Omega| \geq \Omega_2$ | 陷波（去除 50/60 Hz 工频干扰） |

```
幅度响应 |H(jΩ)|:

LPF:        ████████████░░░░░░░░
            0    Ωc        Ω

HPF:        ░░░░░░████████████
            0    Ωc        Ω

BPF:        ░░░░████████░░░░░
            0  Ω1  Ω2     Ω

BSF:        █████████░░████████
            0  Ω1  Ω2     Ω

██ = 通带   ░░ = 阻带   ██░░ = 过渡带
```

</details>

<details class="def-box" open>
<summary>📖 关键参数定义</summary>

**模拟（数字）滤波器的规格参数**：

- **通带边缘频率** $\Omega_p$（$\omega_p$）：通带与过渡带的分界
- **阻带起始频率** $\Omega_s$（$\omega_s$）：过渡带与阻带的分界
- **通带最大衰减** $A_p$（dB）：$|H(j\Omega_p)|$ 相比 $|H(j 0)|$ 的最大允许衰减
- **阻带最小衰减** $A_s$（dB）：阻带中 $|H(j\Omega_s)|$ 必须达到的最小衰减
- **过渡带宽** $\Delta\Omega = |\Omega_s - \Omega_p|$（$\Delta\omega = |\omega_s - \omega_p|$）

$$A_p = -20\log_{10}(|H(j\Omega_p)|) \quad \text{dB}$$

$$A_s = -20\log_{10}(|H(j\Omega_s)|) \quad \text{dB}$$

**工程规格表示例**（低通，$\Omega_c = 2\pi \times 1$ kHz）：

| 参数 | 值 |
|------|-----|
| 通带边缘 $\Omega_p$ | $2\pi \times 1$ kHz |
| 阻带起始 $\Omega_s$ | $2\pi \times 1.5$ kHz |
| 通带纹波 $\delta_1$ | 1 dB |
| 阻带衰减 $A_s$ | 40 dB |

</details>

---

## 二、理想滤波器与实际滤波器

### 🔍 理想滤波器：数学上的完美，物理上的不可能

**理想滤波器**的频率响应是完美的矩形（通带增益 = 1，阻带增益 = 0，过渡带宽 = 0）。这在数学上很优美——但它有一个致命的缺陷：**物理不可实现**。

<details class="def-box" open>
<summary>📖 定理：理想滤波器的不可实现性</summary>

**Paley-Wiener 准则**（必要条件）：如果一个因果系统的幅度响应 $|H(j\Omega)|$ 在某个频段上严格为零，则其相位必须满足非常严格的约束，实际上无法用有限阶系统实现。

**因果性约束**：现实中的滤波器必须是**因果**（$h(t) = 0, t < 0$）的。理想低通的冲激响应是：

$$h(t) = \frac{\Omega_c}{\pi} \text{sinc}(\Omega_c t) = \frac{\sin(\Omega_c t)}{\pi t}$$

这是一个 **sinc 函数**，在 $t < 0$ 时非零（**非因果**）——你无法在信号到达之前就产生响应！

**实际滤波器的权衡**：
1. **允许有限的过渡带**（放弃矩形，改为缓坡）
2. **允许一定的通带/阻带纹波**（放弃平坦）
3. **使用非理想相位特性**（放弃线性相位）

> 🎯 **工程哲学**：没有完美的滤波器，只有"足够好"的滤波器。设计滤波器就是在这几个指标之间找平衡。

</details>

---

## 三、Butterworth 滤波器

### 🔍 最平坦的响应——通带像水面一样平

**Butterworth 滤波器**的核心设计思想：**通带幅度响应尽可能平坦**（在 $\Omega = 0$ 处各阶导数均为零，直到 $N$ 阶）。这意味着在通带内，所有频率分量几乎等增益通过，不会出现明显的"波纹"。

> 🎯 **生活类比**：Butterworth 滤波器的幅度响应曲线像一片平静的湖面——波浪（纹波）被压制到最小，直到逼近截止频率时才"啪"地一下跌落。它是最保守、最稳健的选择，特别适合音频处理等对通带平坦性要求高的场景。

---

<details class="def-box" open>
<summary>📖 定义：Butterworth 幅度响应</summary>

**N 阶 Butterworth 低通滤波器的幅度响应**：

$$|H_a(j\Omega)| = \frac{1}{\sqrt{1 + (\Omega / \Omega_c)^{2N}}}$$

其中：
- $\Omega_c$：**截止频率**（幅度下降为 $1/\sqrt{2}$ ≈ 0.707，即 **-3 dB 点**）
- $N$：**滤波器阶数**（越高，过渡带越陡峭）

**关键特性**：
- $\Omega = 0$ 时，$|H_a(j0)| = 1$（零阶导数 → 最平坦）
- $\Omega = \Omega_c$ 时，$|H_a(j\Omega_c)| = 1/\sqrt{2}$（-3 dB，与阶数 $N$ 无关）
- 过渡带宽度与 $N$ 成反比：$N$ 越大，过渡越陡

```
Butterworth 幅度响应（不同阶数 N）：

|H(jΩ)|  N=1
   1 ▏
     │  N=2
     │   N=3
     │    N=5
     │     ↘
     │        ↘
     └────────────→ Ω
       Ωc
```

</details>

<details class="def-box" open>
<summary>📖 极点位置与系统函数</summary>

**Butterworth 滤波器的极点**分布在 **s 平面左半平面的单位圆**上（对于归一化截止频率 $\Omega_c = 1$ rad/s）：

极点：$p_k = \Omega_c \cdot e^{j\pi(2k+N-1)/(2N)}$，$k = 1, 2, \ldots, N$

这些极点均匀分布在半径为 $\Omega_c$ 的半圆上（仅左半平面部分）。

**系统函数**：

$$H_a(s) = \frac{\Omega_c^N}{\prod_{k=1}^{N}(s - p_k)}$$

**分母多项式**：Butterworth 多项式 $B_N(s)$（归一化，$\Omega_c = 1$）。

</details>

---

## 四、Chebyshev 与椭圆滤波器

### 🔍 用"纹波"换取"陡峭"

Butterworth 的问题是：**过渡带太平缓**。要陡峭就得提高阶数 $N$，但阶数越高，计算越复杂。**Chebyshev 滤波器**换了一个思路：允许通带或阻带有**等纹波**（周期性起伏），以换取更陡峭的过渡带。

> 🎯 **生活类比**：想象你要从 A 点（通带）快速到达 B 点（阻带）——Butterworth 是绕远路但全程平坦，Chebyshev 是"抄近路"但路上有些颠簸（纹波）。你是要舒适（平坦）还是要快（陡峭）？

---

<details class="def-box" open>
<summary>📖 Chebyshev I 型（通带等纹波）</summary>

$$|H_a(j\Omega)| = \frac{1}{\sqrt{1 + \epsilon^2 T_N^2(\Omega/\Omega_c)}}$$

其中：
- $\epsilon$：**纹波系数**（越大 → 纹波越大）
- $T_N(x)$：**Chebyshev 多项式**（递推：$T_0(x)=1$, $T_1(x)=x$, $T_{N+1}(x)=2xT_N(x)-T_{N-1}(x)$）
- 通带内等纹波，阻带单调下降

</details>

<details class="def-box" open>
<summary>📖 Chebyshev II 型（阻带等纹波）</summary>

$$|H_a(j\Omega)| = \frac{1}{\sqrt{1 + [\epsilon^2 T_N^2(\Omega_s/\Omega_c)] / T_N^2(\Omega_s/\Omega_c)}}$$

- **阻带等纹波**（而非通带）
- 通带**单调下降**（无纹波）

</details>

<details class="def-box" open>
<summary>📖 椭圆滤波器（Cauer 滤波器）</summary>

**通带和阻带均有等纹波**——同时在通带和阻带引入纹波，以换取最陡峭的过渡带：

$$|H_a(j\Omega)| = \frac{1}{\sqrt{1 + \epsilon^2 R_N^2(\Omega/\Omega_c)}}$$

其中 $R_N$ 是**椭圆有理函数**。

**三种滤波器的比较**（相同阶数 $N$）：

| 类型 | 通带平坦性 | 阻带衰减 | 过渡带 |
|------|---------|---------|--------|
| Butterworth | ✅ 最平坦 | 一般 | 缓 |
| Chebyshev I | 纹波 | 好 | 陡 |
| Chebyshev II | 平坦 | 好 | 陡 |
| 椭圆 | 纹波 | ✅ 最好 | ✅ 最陡 |

> 💡 **设计原则**：优先用 **Butterworth**（稳健、平坦）；需要陡峭过渡用 **Chebyshev I**（通带纹波可接受）或 **II**（阻带纹波可接受）；要最陡峭用**椭圆**（但要小心数值稳定性）。

</details>

---

## 五、FIR 滤波器设计：窗函数法

### 🔍 截断理想冲激响应

**设计思路**：
1. 从理想的无限长冲激响应 $h_d[n]$ 出发（矩形频率响应，反变换得 sinc 函数）
2. 用有限长窗 $w[n]$ 截断，得到实际可实现的 $h[n] = h_d[n] \cdot w[n]$
3. 频域上：理想矩形与窗函数频谱的**卷积**，导致过渡带和纹波

> 🎯 **生活类比**：你想画一条完美的直线（理想频率响应），但你手里只有一支固定粗细的笔（窗函数）。你只能通过"涂抹"来近似这条直线——笔越粗（窗越长），线条越模糊（过渡带越宽）；笔越细，线条越清晰但你画的距离有限（主瓣宽度与过渡带宽的矛盾）。

---

<details class="def-box" open>
<summary>📖 方法：窗函数法设计 FIR 滤波器</summary>

**步骤：**

1. **确定理想冲激响应**（IDTFT）：

   低通：$h_d[n] = \frac{\sin(\omega_c n)}{\pi n}$，$n \neq 0$；$h_d[0] = \omega_c/\pi$

2. **选择窗函数**：

   | 窗函数 | 主瓣宽度 | 旁瓣峰值 | 阻带衰减 |
   |--------|---------|---------|---------|
   | 矩形窗（Rectangular）| $4\pi/M$ | -13 dB | **-21 dB** |
   | Hanning（升余弦窗）| $8\pi/M$ | -31 dB | **-44 dB** |
   | Hamming | $8\pi/M$ | -41 dB | **-53 dB** |
   | Blackman | $12\pi/M$ | -57 dB | **-74 dB** |
   | Kaiser（可调）| 可调 | 可调 | 可达 -80 dB 以上 |

   其中 $M$ 为窗长度（FIR 滤波器阶数 $N = M-1$）。

3. **加窗**：$h[n] = h_d[n] \cdot w[n]$，$n = 0, 1, \ldots, M-1$

4. **线性相位**：选择对称窗（$w[n] = w[M-1-n]$）即可保证线性相位。

</details>

<details class="def-box" open>
<summary>📖 Kaiser 窗（自适应窗函数）</summary>

Kaiser 窗同时控制**过渡带宽**和**阻带衰减**：

$$w[n] = \frac{I_0\left(\beta\sqrt{1 - (1 - 2n/M)^2}\right)}{I_0(\beta)}$$

其中 $I_0$ 为修正零阶贝塞尔函数，$\beta$ 控制旁瓣水平。

**设计公式**（由 $A_s$ 推导 $\beta$ 和 $M$）：

$$A_s = \begin{cases} 0 \sim 21 & \beta = 0 \\ 21 \sim 50 & \beta = 0.5842(A_s - 21)^{0.4} + 0.07886(A_s - 21) \\ 50 \sim 74 & \beta = 0.1102(A_s - 8.7) \end{cases}$$

$$M \approx \frac{A_s - 8}{2.285 \Delta\omega} + 1$$

</details>

---

## 六、双线性变换法（模拟到数字）

### 🔍 用非线性映射解决"混叠"问题

**问题**：从模拟滤波器 $H_a(s)$ 转换到数字滤波器 $H(z)$，直接用 $s = j\Omega$ 和 $z = e^{j\omega}$ 的线性关系 $\omega = \Omega T$ 会导致**频率混叠**——高频部分会"折叠"进低频。

**双线性变换**用**非线性映射**解决这个问题：

$$s = \frac{2}{T} \cdot \frac{1 - z^{-1}}{1 + z^{-1}} \quad \Longleftrightarrow \quad z = \frac{1 + sT/2}{1 - sT/2}$$

> 🎯 **直观理解**：把 s 平面映射到 z 平面时，**非线性压缩**把整个虚轴 $[-\infty, +\infty]$ 压缩到单位圆的 $[-\pi, +\pi]$ 一圈。由于是"一一对应"（不折叠），不会发生混叠，但代价是**频率轴发生了非线性畸变**（需要预畸变校正）。

---

<details class="def-box" open>
<summary>📖 定义：双线性变换（Bilinear Transform）</summary>

**从 s 域到 z 域**：

$$H(z) = H_a(s)\bigg|_{s = \frac{2}{T}\frac{1 - z^{-1}}{1 + z^{-1}}}$$

**频率对应关系**（$\Omega$ 为模拟频率，$\omega$ 为数字频率）：

$$\Omega = \frac{2}{T} \tan\left(\frac{\omega}{2}\right) \quad \Longleftrightarrow \quad \omega = 2\arctan\left(\frac{\Omega T}{2}\right)$$

**预畸变（Pre-warping）**：在模拟域设计 $H_a(s)$ 时，将截止频率 $\Omega_c$ 提前变换：

$$\Omega_c' = \frac{2}{T} \tan\left(\frac{\omega_c T}{2}\right)$$

这样经过双线性变换后，数字截止频率才能精确对应。

</details>

<details class="proof-box" open>
<summary>📐 推导：双线性变换的由来</summary>

**积分近似**：模拟积分器 $\frac{1}{s}$ 对应数字累加器 $T \cdot \frac{z}{z-1}$（梯形法则）：

$$\int_0^t x(\tau)d\tau \approx \frac{T}{2}[x(0) + x(T)] + \cdots = \frac{T}{2}\cdot\frac{1+z^{-1}}{1-z^{-1}}\cdot X(z)$$

因此：$\frac{1}{s} \longrightarrow \frac{T}{2}\cdot\frac{1+z^{-1}}{1-z^{-1}}$，即 $s = \frac{2}{T}\cdot\frac{1-z^{-1}}{1+z^{-1}}$。

**为什么用梯形法则？** 梯形法则精度比矩形法则（欧拉）高，且保持了稳定性映射（左半平面 → 单位圆内部）。

</details>

---

## 七、滤波器阶数选择

<details class="def-box" open>
<summary>📖 经验公式与设计查表</summary>

**Butterworth 滤波器阶数**：

$$N = \left\lceil \frac{\log_{10}(10^{A_s/10} - 1) - \log_{10}(10^{A_p/10} - 1)}{2\log_{10}(\omega_s/\omega_p)} \right\rceil$$

**FIR 滤波器阶数**（Kaiser 窗）：

$$M \approx \frac{A_s - 8}{2.285 \cdot \Delta\omega} + 1$$

其中 $\Delta\omega$ 以弧度/样本为单位。

**典型阻带衰减对应的最小窗函数**：

| 阻带衰减 $A_s$ | 推荐窗函数 |
|--------------|-----------|
| ≤ 21 dB | 矩形窗 |
| 21–44 dB | Hanning |
| 44–53 dB | Hamming |
| 53–74 dB | Blackman |
| > 74 dB | Kaiser |

</details>

---

## 八、Python 代码实现

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal
from scipy.signal import butter, cheby1, cheby2, ellip, firwin, freqz

# ============================================================
# 示例 1：四种基本滤波器类型的频率响应
# ============================================================
fig, axes = plt.subplots(2, 2, figsize=(12, 9))

fs = 1000          # 采样频率 Hz
nyq = fs / 2
cutoff = 200       # 截止频率 Hz
transition = 100    # 过渡带宽 Hz

# FIR 低通（窗函数法）
b_lpf = firwin(101, cutoff/nyq, window='hamming')
w, h_lpf = freqz(b_lpf, a=1.0, worN=2000)
axes[0, 0].plot(w/np.pi, 20*np.log10(np.abs(h_lpf) + 1e-12))
axes[0, 0].set_title('Lowpass Filter (FIR, Hamming Window)', fontsize=12)
axes[0, 0].set_ylabel('|H| (dB)')
axes[0, 0].set_xlim(0, 1)
axes[0, 0].axhline(-3, color='red', linestyle='--', label='-3 dB')
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

# FIR 高通
b_hpf = firwin(101, cutoff/nyq, window='hamming', pass_zero=False)
w, h_hpf = freqz(b_hpf, a=1.0, worN=2000)
axes[0, 1].plot(w/np.pi, 20*np.log10(np.abs(h_hpf) + 1e-12))
axes[0, 1].set_title('Highpass Filter (FIR, Hamming Window)', fontsize=12)
axes[0, 1].set_xlim(0, 1)
axes[0, 1].grid(True, alpha=0.3)

# FIR 带通
b_bpf = firwin(101, [cutoff/nyq, (cutoff+transition)/nyq], window='hamming', pass_zero=False)
w, h_bpf = freqz(b_bpf, a=1.0, worN=2000)
axes[1, 0].plot(w/np.pi, 20*np.log10(np.abs(h_bpf) + 1e-12))
axes[1, 0].set_title('Bandpass Filter (FIR, Hamming Window)', fontsize=12)
axes[1, 0].set_xlabel('Normalized Frequency (ω/π)')
axes[1, 0].set_ylabel('|H| (dB)')
axes[1, 0].set_xlim(0, 1)
axes[1, 0].grid(True, alpha=0.3)

# FIR 带阻
b_bsf = firwin(101, [cutoff/nyq, (cutoff+transition)/nyq], window='hamming', pass_zero=True)
w, h_bsf = freqz(b_bsf, a=1.0, worN=2000)
axes[1, 1].plot(w/np.pi, 20*np.log10(np.abs(h_bsf) + 1e-12))
axes[1, 1].set_title('Bandstop Filter (FIR, Hamming Window)', fontsize=12)
axes[1, 1].set_xlabel('Normalized Frequency (ω/π)')
axes[1, 1].set_xlim(0, 1)
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('/workspace/ch7_filter_types.png', dpi=150)
plt.close()
print("四种滤波器类型图已保存到 /workspace/ch7_filter_types.png")

# ============================================================
# 示例 2：Butterworth vs Chebyshev vs 椭圆 幅度响应对比
# ============================================================
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8))

fs = 2000
nyq = fs / 2
Wp = 800 / nyq   # 通带边缘（归一化）
Ws = 1200 / nyq  # 阻带起始
Rp = 1           # 通带纹波 dB
Rs = 40          # 阻带衰减 dB

# 计算各滤波器阶数
N_b, Wn_b = butter(Wp, Ws, btype='bandpass', output='ba')
N_c1, Wn_c1 = cheby1(Wp, Rp, Ws, btype='bandpass', output='ba')
N_c2, Wn_c2 = cheby2(Wp, Rs, Ws, btype='bandpass', output='ba')
N_e, Wn_e = ellip(Wp, Rp, Rs, Ws, btype='bandpass', output='ba')

omega = np.linspace(0, np.pi, 2000)

def get_mag(b, a):
    w, h = freqz(b, a, worN=omega)
    return np.abs(h)

ax1.plot(omega/np.pi, 20*np.log10(get_mag(*N_b) + 1e-12),
         label=f'Butt. (N={len(N_b[0])-1})', linewidth=1.5)
ax1.plot(omega/np.pi, 20*np.log10(get_mag(*N_c1) + 1e-12),
         label=f'Cheb-I (N={len(N_c1[0])-1})', linewidth=1.5)
ax1.plot(omega/np.pi, 20*np.log10(get_mag(*N_c2) + 1e-12),
         label=f'Cheb-II (N={len(N_c2[0])-1})', linewidth=1.5)
ax1.plot(omega/np.pi, 20*np.log10(get_mag(*N_e) + 1e-12),
         label=f'Elliptic (N={len(N_e[0])-1})', linewidth=1.5)
ax1.axhline(-Rp, color='green', linestyle='--', label=f'-{Rp} dB (通带纹波)')
ax1.axhline(-Rs, color='red', linestyle='--', label=f'-{Rs} dB (阻带要求)')
ax1.set_ylabel('|H| (dB)', fontsize=12)
ax1.set_title('Butterworth vs Chebyshev vs Elliptic Bandpass Filters', fontsize=13)
ax1.legend(loc='lower')
ax1.grid(True, alpha=0.3)
ax1.set_xlim(0, 1)
ax1.set_ylim(-60, 2)

ax2.plot(omega/np.pi, np.angle(get_mag(*N_b), deg=True), label='Butterworth', linewidth=1.5)
ax2.plot(omega/np.pi, np.angle(get_mag(*N_c1), deg=True), label='Chebyshev I', linewidth=1.5)
ax2.plot(omega/np.pi, np.angle(get_mag(*N_e), deg=True), label='Elliptic', linewidth=1.5)
ax2.set_xlabel('Normalized Frequency (ω/π)', fontsize=12)
ax2.set_ylabel('Phase (deg)', fontsize=12)
ax2.legend()
ax2.grid(True, alpha=0.3)
ax2.set_xlim(0, 1)

plt.tight_layout()
plt.savefig('/workspace/ch7_filter_comparison.png', dpi=150)
plt.close()
print("Butterworth vs Chebyshev vs Elliptic 对比图已保存")

# ============================================================
# 示例 3：FIR 窗函数法设计与对比
# ============================================================
fs = 2000
cutoff_norm = 0.3  # 归一化截止频率

fig, ax = plt.subplots(figsize=(12, 6))
omega = np.linspace(0, np.pi, 2000)
windows = ['boxcar', 'hanning', 'hamming', 'blackman', ('kaiser', 8)]
labels = ['矩形 (Rect)', 'Hanning', 'Hamming', 'Blackman', 'Kaiser(β=8)']
colors = ['red', 'blue', 'green', 'orange', 'purple']

for wname, label, color in zip(windows, labels, colors):
    b = firwin(101, cutoff_norm, window=wname)
    _, h = freqz(b, a=1.0, worN=omega)
    ax.plot(omega/np.pi, 20*np.log10(np.abs(h) + 1e-12),
            label=label, linewidth=1.5, color=color)

ax.axhline(-21, color='red', linestyle='--', alpha=0.5)
ax.axhline(-44, color='blue', linestyle='--', alpha=0.5)
ax.axhline(-53, color='green', linestyle='--', alpha=0.5)
ax.text(0.82, -22, '-21 dB', fontsize=9, color='red')
ax.text(0.82, -45, '-44 dB', fontsize=9, color='blue')
ax.text(0.82, -54, '-53 dB', fontsize=9, color='green')
ax.set_xlabel('Normalized Frequency (ω/π)', fontsize=12)
ax.set_ylabel('|H| (dB)', fontsize=12)
ax.set_title('FIR Filters: Effect of Window Functions (N=101)', fontsize=13)
ax.legend(loc='lower')
ax.grid(True, alpha=0.3)
ax.set_xlim(0, 1)
ax.set_ylim(-80, 5)
plt.tight_layout()
plt.savefig('/workspace/ch7_window_comparison.png', dpi=150)
plt.close()
print("FIR 窗函数对比图已保存")

# ============================================================
# 示例 4：双线性变换（模拟 → 数字）
# ============================================================
# 模拟 Butterworth 低通：截止频率 1 kHz, 3阶
fs_digital = 5000     # 数字采样频率
T = 1 / fs_digital
fc = 1000             # 截止频率 Hz

# 模拟原型
N_analog = 3
Wn_analog = 2 * np.pi * fc  # rad/s
b_a, a_a = butter(N_analog, Wn_analog, btype='low', analog=True)

# 双线性变换
b_d, a_d = signal.bilinear(b_a, a_a, fs=fs_digital)

# 频率响应对比
w_analog = np.logspace(2, 4.5, 500)  # 100 Hz - 30 kHz
_, H_a = signal.freqs(b_a, a_a, worN=w_analog)

w_digital = np.linspace(0, np.pi, 500)
_, H_d = signal.freqz(b_d, a_d, worN=w_digital)

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(11, 8))

ax1.semilogx(w_analog/(2*np.pi), 20*np.log10(np.abs(H_a)),
             label='Analog H_a(jΩ)', linewidth=2)
ax1.semilogx(fs_digital*w_digital/(2*np.pi),
             20*np.log10(np.abs(H_d) + 1e-12),
             label='Digital H(z) (Bilinear)', linewidth=2, linestyle='--')
ax1.axhline(-3, color='red', linestyle=':', label='-3 dB line')
ax1.axvline(fc, color='green', linestyle=':', label=f'fc={fc} Hz')
ax1.set_ylabel('|H| (dB)', fontsize=12)
ax1.set_title('Analog vs Digital (Bilinear Transform): Butterworth 3rd Order LPF', fontsize=13)
ax1.legend()
ax1.grid(True, which='both', alpha=0.3)
ax1.set_xlim(100, 30000)
ax1.set_ylim(-60, 5)

ax2.semilogx(w_analog/(2*np.pi), np.angle(H_a, deg=True), label='Analog', linewidth=2)
ax2.semilogx(fs_digital*w_digital/(2*np.pi), np.angle(H_d, deg=True),
             label='Digital', linewidth=2, linestyle='--')
ax2.set_xlabel('Frequency (Hz)', fontsize=12)
ax2.set_ylabel('Phase (deg)', fontsize=12)
ax2.legend()
ax2.grid(True, which='both', alpha=0.3)
ax2.set_xlim(100, 30000)

plt.tight_layout()
plt.savefig('/workspace/ch7_bilinear_transform.png', dpi=150)
plt.close()
print("双线性变换对比图已保存")

# ============================================================
# 示例 5：滤波器的实际应用（噪声信号滤波演示）
# ============================================================
np.random.seed(42)
t = np.linspace(0, 1, 10000)  # 1秒，10kHz采样
clean = np.sin(2*np.pi*100*t) + 0.5*np.sin(2*np.pi*300*t)  # 100Hz + 300Hz 有用信号
noise_high = 0.3*np.sin(2*np.pi*2000*t)  # 2kHz 高频噪声
noisy = clean + noise_high

# FIR 低通滤波（截止 500 Hz）
b_filter = firwin(101, 500/5000, window='hamming')
filtered = signal.lfilter(b_filter, 1.0, noisy)

# 频谱分析
freq_bins = np.fft.rfftfreq(len(t), 1/10000)

fig, axes = plt.subplots(3, 2, figsize=(14, 10))
axes[0, 0].plot(t[:500], clean[:500])
axes[0, 0].set_title('Clean: 100Hz + 300Hz')
axes[0, 0].set_xlabel('Time (s)')

axes[0, 1].plot(freq_bins[:300], np.abs(np.fft.rfft(clean))[:300])
axes[0, 1].set_title('Spectrum: Clean')
axes[0, 1].set_xlabel('Frequency (Hz)')
axes[0, 1].grid(True, alpha=0.3)

axes[1, 0].plot(t[:500], noisy[:500])
axes[1, 0].set_title('Noisy: + 2kHz Interference')
axes[1, 0].set_xlabel('Time (s)')

axes[1, 1].plot(freq_bins[:300], np.abs(np.fft.rfft(noisy))[:300])
axes[1, 1].set_title('Spectrum: Noisy')
axes[1, 1].axvline(2000, color='red', linestyle='--', label='2kHz noise')
axes[1, 1].legend()
axes[1, 1].set_xlabel('Frequency (Hz)')
axes[1, 1].grid(True, alpha=0.3)

axes[2, 0].plot(t[:500], filtered[:500], color='green')
axes[2, 0].set_title('Filtered (FIR LPF, fc=500Hz)')
axes[2, 0].set_xlabel('Time (s)')

axes[2, 1].plot(freq_bins[:300], np.abs(np.fft.rfft(filtered))[:300], color='green')
axes[2, 1].set_title('Spectrum: Filtered')
axes[2, 1].set_xlabel('Frequency (Hz)')
axes[2, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('/workspace/ch7_filtering_demo.png', dpi=150)
plt.close()
print("滤波演示图已保存到 /workspace/ch7_filtering_demo.png")

# ============================================================
# 示例 6：设计低通滤波器的完整流程
# ============================================================
print("\n=== FIR 低通滤波器完整设计流程 ===")
# 设计规格
wp = 0.2 * np.pi    # 通带边缘（归一化）
ws = 0.3 * np.pi    # 阻带起始
delta_w = ws - wp   # 过渡带宽

# 各窗函数所需长度
As = {'rect': 21, 'hann': 44, 'hamm': 53, 'black': 74}

print(f"过渡带宽 Δω = {delta_w:.4f} rad")
for wname, As_db in As.items():
    M_est = (As_db - 8) / (2.285 * delta_w) + 1
    print(f"  {wname:>6s} (As={As_db}dB): 估计 M ≈ {M_est:.0f}")

# Kaiser 窗（最优设计）
As_kaiser = 50
beta = 0.5842 * (As_kaiser - 21)**0.4 + 0.07886 * (As_kaiser - 21)
M_kaiser = (As_kaiser - 8) / (2.285 * delta_w)