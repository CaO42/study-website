// Chapter markdown content
// This file embeds all tutorial markdown so it's bundled into the React app

export const CHAPTER_CONTENT: Record<string, Record<number, string>> = {
  '四元数与空间变换': {
    1: `# 第1章：复数与二维旋转

> **本章简介**：理解复数为何是描述二维旋转的"自然语言"，掌握欧拉公式与旋转矩阵的等价性，为后续学习四元数打下几何直觉基础。
>
> ⏱ 预估学时：3 小时 | 难度：⭐ | 📍 前置：高中数学（向量基础、三角函数）

---

## 一、复数的定义与几何表示

### 🔍 通俗理解

想象一张普通的 XY 平面直角坐标系，但这次我们给纵轴起个新名字——叫做**虚轴**（Imaginary Axis）。普通横轴叫**实轴**（Real Axis）。这样一个被重新命名的坐标系，就是**复平面**（Complex Plane）。

> 🎯 **生活类比**：把复平面想象成一个小区。实数部分告诉你往东走多少步，虚数部分告诉你往北走多少步。比如地址"3 + 4i"就是从小区入口（原点）往东走3步，再往北走4步。

---

<details class="def-box" open>
<summary>📖 定义 1：复数（Complex Number）</summary>

复数是形如 **z = a + bi** 的数，其中 a 和 b 均为实数，i 满足 **i² = -1**（称为虚数单位）。

- a 称为复数 z 的**实部**（Real Part），记作 Re(z) = a
- b 称为复数 z 的**虚部**（Imaginary Part），记作 Im(z) = b
- 当 b = 0 时，z = a 是实数（实数是复数的特例）
- 当 a = 0 且 b ≠ 0 时，z = bi 称为**纯虚数**

复数 z = a + bi 在复平面上对应唯一点 (a, b)，反之亦然。

\`\`\`
         复平面（Complex Plane）
    Im   |
    轴   |        z = a + bi
         |           ↑
         |          /(b)
         |         / ↗
    0 ----+--------→ Re 轴
\`\`\`

</details>

<details class="def-box" open>
<summary>📖 定义 2：模长与辐角（三角形式）</summary>

对于复数 z = a + bi：

- **模长**（Modulus）：|z| = √(a² + b²)
- **辐角**（Argument）：arg(z) = θ

于是得到复数的**三角形式**：

$$z = |z|(\\cos\\theta + i\\sin\\theta)$$

| 复数 | 模长 | 辐角 |
|------|------|------|
| 1 | 1 | 0 |
| i | 1 | π/2 |
| -1 | 1 | π |

</details>

---

## 二、复数的基本运算

### 🔍 通俗理解

**加减法**：把实部和虚部分别相加减——就像在地图上走两段路。

**乘法**：把两个向量的长度（模长）相乘，把方向（辐角）相加。这就是"模长相乘，辐角相加"。

**乘以 i**：i 的模长是 1，辐角是 90°，所以乘以 i = 逆时针旋转 90°！

<details class="def-box" open>
<summary>📖 定义 3：共轭复数</summary>

复数 z = a + bi 的共轭：$$\\overline{z} = a - bi$$

核心性质：$$z \\cdot \\overline{z} = |z|^2 = a^2 + b^2$$

几何意义：共轭复数关于实轴对称。

</details>

<details class="def-box" open>
<summary>📖 定义 4：复数乘积公式</summary>

设 z₁ = r₁(cos θ₁ + i sin θ₁)，z₂ = r₂(cos θ₂ + i sin θ₂)，则：

$$z_1 \\cdot z_2 = r_1 r_2 \\left[\\cos(\\theta_1+\\theta_2) + i\\sin(\\theta_1+\\theta_2)\\right]$$

**几何意义**：模长相乘，辐角相加 → **旋转 + 缩放**

</details>

---

## 三、欧拉公式：桥接代数与几何

> 🌟 想象你站在复平面原点，面向正实轴方向（1 + 0i）。以单位速度逆时针旋转 θ 角度，落点正好是复数 cosθ + i sinθ——而 e^{iθ} 正是这条路线的"GPS坐标标签"。

$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$

当 θ = π 时，得到著名的**欧拉恒等式**：

$$e^{i\\pi} + 1 = 0$$

这条等式串联了 e、i、π、1、0 五个最重要的数学常数，被誉为"数学中的蒙娜丽莎"。

<details class="proof-box" open>
<summary>📐 推导：泰勒级数证明 $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$</summary>

**第一步：写出泰勒级数**

$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$$
$$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots$$
$$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$$

**第二步：代入 x = iθ**

$$e^{i\\theta} = 1 + i\\theta - \\frac{\\theta^2}{2!} - \\frac{i\\theta^3}{3!} + \\frac{\\theta^4}{4!} + \\cdots$$

**第三步：分组实部虚部**

- **实部**：$1 - \\frac{\\theta^2}{2!} + \\frac{\\theta^4}{4!} - \\cdots = \\cos\\theta$
- **虚部**：$\\theta - \\frac{\\theta^3}{3!} + \\frac{\\theta^5}{5!} - \\cdots = \\sin\\theta$

$$\\boxed{e^{i\\theta} = \\cos\\theta + i\\sin\\theta}$$

□ 证毕

</details>

---

## 四、复数乘法与二维旋转（本章核心）

### 🔍 通俗理解

用复数旋转向量 (x, y)：三步走：

1. 写成复数：z = x + yi
2. 构造旋转复数：e^{iθ} = cosθ + i sinθ
3. 相乘：z' = z · e^{iθ}

**结果**：z' 的实部 = 旋转后的 x'，虚部 = 旋转后的 y'

**具体例子**：把点 (1, 0) 旋转 90°：
$$1 \\cdot e^{i\\pi/2} = 1 \\cdot (0 + i) = i \\Rightarrow (0, 1) ✅$$

<details class="proof-box" open>
<summary>📐 推导：复数旋转 ≡ 旋转矩阵</summary>

**复数乘法展开**：

$$z \\cdot e^{i\\theta} = (x+yi)(\\cos\\theta + i\\sin\\theta) = (x\\cos\\theta - y\\sin\\theta) + i(x\\sin\\theta + y\\cos\\theta)$$

**旋转矩阵乘法**：

$$\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix}$$

$$\\Rightarrow x' = x\\cos\\theta - y\\sin\\theta,\\quad y' = x\\sin\\theta + y\\cos\\theta$$

✅ **两式完全相同！**

| 复数形式 | 矩阵形式 |
|---------|---------|
| $e^{i\\theta}$ | $\\begin{pmatrix}\\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta\\end{pmatrix}$ |
| 乘法 $z \\cdot e^{i\\theta}$ | 矩阵乘法 $R(\\theta) \\cdot \\vec{v}$ |

□ 证毕

</details>

---

## 五、代码实现

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def rotate_vector(x, y, theta_deg):
    """旋转矩阵法"""
    theta = np.radians(theta_deg)
    R = np.array([
        [np.cos(theta), -np.sin(theta)],
        [np.sin(theta),  np.cos(theta)]
    ])
    return R @ np.array([x, y])

def rotate_complex(x, y, theta_deg):
    """复数乘法法"""
    theta = np.radians(theta_deg)
    z = complex(x, y)
    z_rot = z * complex(np.cos(theta), np.sin(theta))
    return z_rot.real, z_rot.imag

# 验证等价性
for deg in [30, 60, 90, 120]:
    v = np.array([1.0, 0.0])
    R = rotate_vector(*v, deg)
    v2 = rotate_complex(*v, deg)
    print(f"{deg}° | 矩阵: {R} | 复数: {v2} | 差异: {np.max(np.abs(R - v2)):.2e}")

# 可视化
fig, ax = plt.subplots(figsize=(6, 6))
ax.set_xlim(-1.5, 1.5)
ax.set_ylim(-1.5, 1.5)
ax.set_aspect('equal')
ax.axhline(0, color='gray', lw=0.5)
ax.axvline(0, color='gray', lw=0.5)

theta_vals = [0, 45, 90, 135, 180]
colors = ['blue', 'green', 'red', 'purple', 'orange']
for deg, c in zip(theta_vals, colors):
    v = rotate_vector(1, 0, deg)
    ax.annotate('', xy=v, xytext=[0,0], arrowprops=dict(arrowstyle='->', color=c, lw=2))
    ax.text(v[0]*1.15, v[1]*1.15, f'{deg}°', color=c, fontsize=9)

theta_c = np.linspace(0, 2*np.pi, 100)
ax.plot(np.cos(theta_c), np.sin(theta_c), 'k--', alpha=0.3)
ax.set_title('复数乘法实现2D旋转：$e^{i\\theta}$ vs 旋转矩阵')
plt.tight_layout()
plt.savefig('/workspace/studies/四元数与空间变换/ch1_rotation_demo.png', dpi=150)
print("图片已保存!")
\`\`\`

---

## 📝 本章要点速记

1. **复数 z = a + bi 在复平面上就是点 (a, b)**
2. **模长 |z| = √(a²+b²)**，**辐角 arg(z)** 是与正实轴的夹角
3. **欧拉公式 e^{iθ}=cosθ+i sinθ** 是复数与旋转的核心桥梁
4. **复数乘法：模长相乘，辐角相加** → 旋转+缩放
5. **单位复数 e^{iθ}（|e^{iθ}|=1）= 纯旋转，不缩放**
6. **旋转矩阵 R(θ) 与 e^{iθ} 是同一旋转的等价表示**
7. **乘以 i = 逆时针旋转90°**

---

## 🎯 章节练习

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐ | 将复数 z = 1 + i 化为三角形式 |
| 2 | 推导题 | ⭐⭐ | e^{iπ/2} = i 的几何意义 |
| 3 | 判断题 | ⭐ | 复数乘法是否满足交换律？|
| 4 | 计算题 | ⭐⭐ | 将点 P(3,4) 绕原点旋转 60°，两种方法分别计算 |
| 5 | 证明题 | ⭐⭐⭐ | 证明三维旋转不满足交换律 |

---

## 🚀 下一章预告

**第2章：四元数的定义与代数结构**

为什么二维旋转靠复数完全够用，但到了三维就"力不从心"了？三维空间中的任意旋转（一个旋转轴 + 一个旋转角）需要一个"三维的复数"——这就是**四元数**（Quaternion）。Hamilton 如何在都柏林一座桥上"顿悟"了四元数的乘法规则？学完下一章，你将真正理解四元数的代数结构。
`,
  },
  '四元数与空间变换': {
    2: `# 第2章：四元数的定义与代数结构

> **本章简介**：理解四元数如何作为复数的"三维扩展"而被 Hamilton 发现，掌握四元数的四种代数表示、基本运算规则与核心代数性质。**特别提醒**：四元数乘法**不满足交换律**——这是它与复数最重要的区别，也是它能够描述三维旋转的关键所在。
>
> ⏱ 预估学时：4 小时 | 难度：⭐⭐ | 📍 前置：第1章（复数基础）

---

## 一、四元数的诞生：从二维到三维的"意外跨越"

### 🔍 通俗理解

在第1章中，我们看到复数（2个数分量）完美描述了二维平面上的旋转。数学家们自然会想：能否找到一种"三维的复数"，用类似的方式描述三维空间中的旋转？

这个问题困扰了数学家们很久。复数的核心是虚数单位 **i**（满足 i² = −1）。如果要"扩展到三维"，直觉上需要引入第二个虚数单位——比如 j。那么设：

$$q = a + bi + cj$$

其中 a, b, c 是实数，尝试定义 j² = −1。然后会发生什么？

Hamilton 花了十多年时间，试图构造一个"三维复数"代数，但每一步推导都会撞上一堵墙——**矛盾**。直到 1843 年 10 月 16 日，他在都柏林布鲁姆桥（Royal Canal Bridge）上突然顿悟：关键在于**需要三个虚数单位，而不是两个**！

他兴奋地在桥上刻下了著名的乘法规则（后来被刻石保存至今）。

> 🎯 **生活类比**：二维旋转需要"一圈"（360°），复数用一个虚数单位 i 就能描述。三维旋转涉及一个**旋转轴**和一个**旋转角**——这就好比不是在一个平面上转圈，而是在整个球面上转。描述球面需要三个"方向参数"，所以四元数恰好有四个分量：一个标量（代表旋转"量"的大小）+ 三个虚数分量（代表旋转轴的三个方向信息）。

**为何二维复数不够？** 三维旋转不能用复数直接描述，因为复数乘法只能让平面上两点旋转——无法同时指定旋转轴。例如，先绕 X 轴旋转 90°，再绕 Y 轴旋转 90°，最终姿态与交换顺序后的结果不同。这说明三维旋转是**非交换**的，复数的乘法是交换的（ab = ba），不足以描述这种非交换性。

---

## 二、四元数的代数定义

### 🔍 通俗理解

四元数就像复数的"全面升级版"：复数有一个实部 + 一个虚部（i），四元数有一个实部 + **三个**虚部（i, j, k）。把三个虚数单位想象成三维空间里的三个正交轴（X, Y, Z 轴），四元数就是用 a + bi + cj + dk 同时编码"旋转强度"和"旋转轴方向"。

> 🎯 **地址标签的比喻**：如果三维空间中的一个点用坐标 (x, y, z) 定位，那么四元数用 (a, b, c, d) 四个数字来描述一次旋转。其中 a 是"整体缩放"，b 是"绕 i 轴的贡献"，c 是"绕 j 轴的贡献"，d 是"绕 k 轴的贡献"。一个四元数 = 一个旋转事件，而不是一个静止点。

---

<details class="def-box" open>
<summary>📖 定义 1：四元数（Quaternion）</summary>

四元数是形如：

$$q = a + bi + cj + dk$$

的数，其中 $a, b, c, d \in \mathbb{R}$，虚数单位 $i, j, k$ 满足以下乘法规则（**Hamilton 乘法表**）：

| ×   | **i** | **j** | **k** |
|-----|-------|-------|-------|
| **i** | −1 | +k   | −j   |
| **j** | −k  | −1   | +i   |
| **k** | +j   | −i   | −1   |

等价写法（第二行起每行循环）：

$$i^2 = j^2 = k^2 = ijk = -1$$

由以上规则可以推导出：

$$ij = k, \quad ji = -k$$
$$jk = i, \quad kj = -i$$
$$ki = j, \quad ik = -j$$

**核心观察**：$ij = k$ 但 $ji = -k$，这说明四元数乘法**不满足交换律**——这是四元数最重要的代数特征，也是它能描述三维旋转的根本原因！

四元数的集合记作 $\mathbb{H}$（为纪念 Hamilton，首字母 H）。

</details>

<details class="def-box" open>
<summary>📖 定义 2：四元数的四种表示形式</summary>

同一个四元数可以用四种等价方式表示：

**形式一：标准代数形式（最常用）**

$$q = a + bi + cj + dk$$

其中 $a, b, c, d \in \mathbb{R}$。

**形式二：标量-向量形式（几何直觉最强）**

$$q = [s, \vec{v}] = [a, \; (b, c, d)]$$

- $s = a$ 称为**标量部分**（Scalar）
- $\vec{v} = (b, c, d)$ 称为**向量部分**（Vector）

**形式三：复数扩展形式（与复数类比）**

$$q = (a + bi) + (c + di)j = \alpha + \beta j$$

其中 $\alpha = a + bi, \beta = c + di$，注意 $\beta j \neq j\beta$（乘法不交换）。

**形式四：三角/极形式（用于旋转）**

当 $|\!q\!| = 1$（单位四元数）时：

$$q = [\cos\theta, \; \sin\theta \; \vec{u}] = \cos\theta + \sin\theta \; (u_x i + u_y j + u_z k)$$

其中 $\vec{u} = (u_x, u_y, u_z)$ 是单位向量（表示旋转轴），θ 是旋转角的一半（注意是**一半**！）。

> ⚠️ **为什么是 θ/2？** 这与四元数旋转的"双覆盖"性质有关，将在第3章详细解释。直觉上：三维旋转只需要半个四元数空间即可一一对应。

</details>

---

## 三、四元数的基本运算

### 🔍 通俗理解

**加法**：最简单，把各分量相加，就像合并两个四维坐标。
**乘法**：最复杂，也最重要。Hamilton 积不满足交换律——这意味着 $q_1 \cdot q_2 \neq q_2 \cdot q_1$。这在日常生活中也有类比：先穿上袜子再穿鞋 ≠ 先穿鞋再穿袜子。旋转操作同样如此——顺序不同，结果不同！

**共轭**：就像复数共轭把 i 变 −i，四元数共轭把 b, c, d 全变号。共轭与自身的乘积等于模长的平方 $q \cdot q^* = |q|^2$——这个性质让我们能求四元数的逆。

---

<details class="def-box" open>
<summary>📖 定义 3：四元数的加减法与数乘</summary>

设两个四元数 $q_1 = a_1 + b_1 i + c_1 j + d_1 k$，$q_2 = a_2 + b_2 i + c_2 j + d_2 k$：

**加法**（逐分量相加）：

$$q_1 + q_2 = (a_1+a_2) + (b_1+b_2)i + (c_1+c_2)j + (d_1+d_2)k$$

**数乘**（标量 λ 乘以四元数）：

$$\lambda q_1 = (\lambda a_1) + (\lambda b_1)i + (\lambda c_1)j + (\lambda d_1)k$$

**减法**即加法加上数乘 (−1)。

> 💡 **几何直觉**：加减法就是在四维"标量-向量空间"中做向量加法，非常直观。真正有几何意义的是乘法。

</details>

<details class="def-box" open>
<summary>📖 定义 4：Hamilton 积（四元数乘法）</summary>

设 $q_1 = a_1 + b_1 i + c_1 j + d_1 k$，$q_2 = a_2 + b_2 i + c_2 j + d_2 k$，利用 Hamilton 乘法表展开：

$$q_1 q_2 = (a_1a_2 - b_1b_2 - c_1c_2 - d_1d_2) + (a_1b_2 + b_1a_2 + c_1d_2 - d_1c_2)i + (a_1c_2 - b_1d_2 + c_1a_2 + d_1b_2)j + (a_1d_2 + b_1c_2 - c_1b_2 + d_1a_2)k$$

**标量-向量形式**下更紧凑：

$$q_1 = [s_1, \vec{v}_1], \quad q_2 = [s_2, \vec{v}_2]$$

$$\boxed{q_1 q_2 = [s_1 s_2 - \vec{v}_1 \cdot \vec{v}_2, \; s_1\vec{v}_2 + s_2\vec{v}_1 + \vec{v}_1 \times \vec{v}_2]}$$

其中 $\vec{v}_1 \cdot \vec{v}_2$ 是向量点积，$\vec{v}_1 \times \vec{v}_2$ 是向量叉积。

**核心性质**：

| 性质 | 表达式 |
|------|--------|
| 非交换律 | $q_1 q_2 \neq q_2 q_1$（一般情况） |
| 结合律 | $(q_1 q_2) q_3 = q_1 (q_2 q_3)$ ✅ |
| 分配律 | $q_1(q_2+q_3) = q_1q_2 + q_1q_3$ ✅ |
| 单位元 | $1 \cdot q = q \cdot 1 = q$ |

> ⚠️ **警告**：$ij = k$ 但 $ji = -k$！顺序不同，结果不同。**三维旋转不满足交换律**这一物理事实，精确反映在四元数乘法的非交换性中。

</details>

<details class="proof-box" open>
<summary>📐 推导：Hamilton 积的向量形式（从展开式到 $[s, \vec{v}]$ 形式）</summary>

**目标**：将 $q_1 = a_1 + b_1i + c_1j + d_1k$ 与 $q_2 = a_2 + b_2i + c_2j + d_2k$ 的乘积，用标量 $s$ 和三维向量 $\vec{v} = (b, c, d)$ 表示。

**第一步：完全展开**

将 $q_1 q_2$ 逐项展开，利用 $i^2=j^2=k^2=-1$ 和乘法表：

$$q_1 q_2 = a_1a_2 + a_1b_2 i + a_1c_2 j + a_1d_2 k + b_1a_2 i + b_1b_2 i^2 + b_1c_2 ij + b_1d_2 ik + c_1a_2 j + c_1b_2 ji + c_1c_2 j^2 + c_1d_2 jk + d_1a_2 k + d_1b_2 ki + d_1c_2 kj + d_1d_2 k^2$$

**第二步：代入乘法规则**

将 $ij=k,\; ji=-k,\; jk=i,\; kj=-i,\; ki=j,\; ik=-j$ 代入：

$$= a_1a_2 + a_1b_2 i + a_1c_2 j + a_1d_2 k + b_1a_2 i - b_1b_2 + b_1c_2 k - b_1d_2 j + c_1a_2 j - c_1b_2 k - c_1c_2 + c_1d_2 i + d_1a_2 k + d_1b_2 j - d_1c_2 i - d_1d_2$$

**第三步：合并同类项**

**标量部分**（纯实数）：

$$s = a_1a_2 - b_1b_2 - c_1c_2 - d_1d_2$$

**i 系数**（$\vec{v}$ 的第一分量）：

$$b = a_1b_2 + b_1a_2 + c_1d_2 - d_1c_2$$

**j 系数**（$\vec{v}$ 的第二分量）：

$$c = a_1c_2 - b_1d_2 + c_1a_2 + d_1b_2$$

**k 系数**（$\vec{v}$ 的第三分量）：

$$d = a_1d_2 + b_1c_2 - c_1b_2 + d_1a_2$$

**第四步：识别向量运算**

令 $\vec{v}_1 = (b_1, c_1, d_1)$，$\vec{v}_2 = (b_2, c_2, d_2)$，定义叉积：

$$\vec{v}_1 \times \vec{v}_2 = \begin{pmatrix} c_1d_2 - d_1c_2 \\ d_1b_2 - b_1d_2 \\ b_1c_2 - c_1b_2 \end{pmatrix}$$

点积：$\vec{v}_1 \cdot \vec{v}_2 = b_1b_2 + c_1c_2 + d_1d_2$

完整表达式化简为：

$$\boxed{q_1 q_2 = [a_1a_2 - \vec{v}_1 \cdot \vec{v}_2, \; a_1\vec{v}_2 + a_2\vec{v}_1 + \vec{v}_1 \times \vec{v}_2]}$$

□ 证毕

> 📌 **几何直觉**：Hamilton 积的标量部分 $s_1s_2 - \vec{v}_1\cdot\vec{v}_2$ 反映"长度"信息；向量部分 $s_1\vec{v}_2 + s_2\vec{v}_1 + \vec{v}_1\times\vec{v}_2$ 中的叉积 $\vec{v}_1\times\vec{v}_2$ 体现了**方向依赖性**（即乘法非交换的来源）。

</details>

---

## 四、共轭、模长与逆元

### 🔍 通俗理解

**共轭**（Conjugate）就像镜子里反射的像：把向量部分的虚轴全部取反，标量部分不变。记作 $q^*$ 或 $\bar{q}$。

**模长**（Norm）衡量四元数的大小，和三维空间里向量的长度一样：四个分量平方和开根号。

**逆元**（Inverse）是四元数的"倒数"。复数的倒数 $\frac{1}{z} = \frac{\bar{z}}{|z|^2}$，四元数也类似，但必须小心——因为乘法不交换，四元数的逆要同时满足 $q^{-1} q = 1$ 和 $q q^{-1} = 1$（实际上两者都成立，结合律保证左右逆相等）。

---

<details class="def-box" open>
<summary>📖 定义 5：共轭四元数</summary>

四元数 $q = a + bi + cj + dk$ 的共轭记作 $q^*$，定义为：

$$\boxed{q^* = a - bi - cj - dk = [a, \; -\vec{v}]}$$

**核心性质**：

| 性质 | 表达式 |
|------|--------|
| 自反共轭 | $(q^*)^* = q$ |
| 加法共轭 | $(q_1 + q_2)^* = q_1^* + q_2^*$ |
| 乘法共轭 | $(q_1 q_2)^* = q_2^* q_1^*$（注意顺序颠倒！） |
| 自身乘积 | $q \cdot q^* = a^2 + b^2 + c^2 + d^2 = |q|^2$ |
| 模长关系 | $|q^*| = |q|$ |

> ⚠️ 注意乘法共轭规则：$(q_1 q_2)^* = q_2^* q_1^*$！顺序颠倒的原因是：共轭逆转顺序。

</details>

<details class="def-box" open>
<summary>📖 定义 6：模长与逆元</summary>

**模长**（Norm / Magnitude）：

$$\boxed{|q| = \sqrt{a^2 + b^2 + c^2 + d^2} = \sqrt{q \cdot q^*}}$$

**单位四元数**：$|\!q\!| = 1$ 的四元数，记作 $\hat{q}$，专门用于表示三维旋转。

**逆元**（Inverse）：满足 $q^{-1} q = q q^{-1} = 1$ 的四元数。

$$\boxed{q^{-1} = \frac{q^*}{|q|^2}}$$

**验证**：

$$q \cdot q^{-1} = q \cdot \frac{q^*}{|q|^2} = \frac{q \cdot q^*}{|q|^2} = \frac{|q|^2}{|q|^2} = 1 \quad \checkmark$$

> 💡 **几何直觉**：对于单位四元数 $|\!q\!| = 1$，逆元就是共轭：$q^{-1} = q^*$，这和复数单位复数的情况完全一致（$e^{i\theta}$ 的逆 = $e^{-i\theta}$）。

</details>

<details class="def-box" open>
<summary>📖 定义 7：单位四元数与纯四元数</summary>

**单位四元数**（Unit Quaternion）：$|\!q\!| = 1$，可以写成：

$$\hat{q} = [\cos\theta, \; \sin\theta \; \vec{u}]$$

其中 $\vec{u}$ 是单位向量，$\theta \in [0, 2\pi)$。

- **纯四元数**（Pure Quaternion）：标量部分 $s = 0$ 的四元数，$q_{pure} = [0, \vec{v}] = bi + cj + dk$
- 任意四元数都可以分解为纯四元数加上标量：$q = [s, \vec{0}] + [0, \vec{v}]$

**特殊单位四元数**：

| 四元数 | 标量 | 向量 | 含义 |
|--------|------|------|------|
| 1 | 1 | (0,0,0) | 零旋转 |
| −1 | −1 | (0,0,0) | 零旋转（双覆盖，见第3章）|
| i | 0 | (1,0,0) | 绕 X 轴旋转 180° |
| j | 0 | (0,1,0) | 绕 Y 轴旋转 180° |
| k | 0 | (0,0,1) | 绕 Z 轴旋转 180° |

</details>

---

## 五、代码实现：四元数运算

\`\`\`python
import numpy as np

class Quaternion:
    """四元数类：封装基本运算"""
    def __init__(self, s=1.0, v=(0.0, 0.0, 0.0)):
        """四元数构造函数: q = [s, v] = s + v_x*i + v_y*j + v_z*k"""
        self.s = float(s)
        self.v = np.array(v, dtype=float)

    def __repr__(self):
        return f"[{self.s:.3f}, ({self.v[0]:.3f}, {self.v[1]:.3f}, {self.v[2]:.3f})]"

    def conjugate(self):
        """共轭四元数: q* = [s, -v]"""
        return Quaternion(self.s, -self.v)

    def norm(self):
        """模长: |q| = sqrt(s^2 + |v|^2)"""
        return np.sqrt(self.s**2 + np.dot(self.v, self.v))

    def normalize(self):
        """归一化: q / |q|"""
        n = self.norm()
        if n < 1e-10:
            raise ValueError("四元数模长接近0，无法归一化")
        return Quaternion(self.s / n, self.v / n)

    def inverse(self):
        """逆元: q^{-1} = q* / |q|^2"""
        n2 = self.norm()**2
        return Quaternion(self.s / n2, -self.v / n2)

    def __mul__(self, other):
        """Hamilton 积: q1 * q2 = [s1*s2 - v1·v2,  s1*v2 + s2*v1 + v1×v2]"""
        if isinstance(other, Quaternion):
            scalar = self.s * other.s - np.dot(self.v, other.v)
            vector = self.s * other.v + other.s * self.v + np.cross(self.v, other.v)
            return Quaternion(scalar, vector)
        else:
            return Quaternion(other * self.s, other * self.v)

    def dot(self, other):
        """点积"""
        return self.s * other.s + np.dot(self.v, other.v)

    def to_axis_angle(self):
        """单位四元数 -> 轴角表示"""
        if abs(self.s) > 1.0:
            self = self.normalize()
        theta = 2 * np.arccos(max(-1, min(1, self.s)))
        sin_half = np.sin(theta / 2)
        if abs(sin_half) < 1e-10:
            return np.array([1.0, 0.0, 0.0]), 0.0
        axis = self.v / sin_half
        return axis, theta

    def to_matrix(self):
        """单位四元数 -> 旋转矩阵（3×3）"""
        s, (x, y, z) = self.s, self.v
        length_sq = s**2 + x**2 + y**2 + z**2
        s /= length_sq**0.5; x /= length_sq**0.5
        y /= length_sq**0.5; z /= length_sq**0.5
        return np.array([
            [1 - 2*(y**2 + z**2), 2*(x*y - s*z),       2*(x*z + s*y)],
            [2*(x*y + s*z),       1 - 2*(x**2 + z**2), 2*(y*z - s*x)],
            [2*(x*z - s*y),       2*(y*z + s*x),       1 - 2*(x**2 + y**2)]
        ])


if __name__ == "__main__":
    q1 = Quaternion(1, (2, 3, 4))
    q2 = Quaternion(5, (6, 7, 8))
    print(f"q1 = {q1}, |q1| = {q1.norm():.4f}")
    print(f"q2 = {q2}")
    print(f"q1* = {q1.conjugate()}")
    print(f"q1^{-1} = {q1.inverse()}")
    print(f"q1 * q2 = {q1 * q2}")
    print(f"q2 * q1 = {q2 * q1}")
    print(f"q1*q2 ≠ q2*q1? {not (q1 * q2) == (q2 * q1)}")  # True，证明非交换
\`\`\`

---

## 📝 本章要点速记

1. **四元数定义**：$q = a + bi + cj + dk$，三个虚数单位满足 $i^2=j^2=k^2=ijk=-1$

2. **四种表示形式**：标准形式、标量-向量形式 $[s, \vec{v}]$、复数扩展形式、三角形式

3. **Hamilton 积**：$q_1 q_2 = [s_1s_2 - \vec{v}_1\cdot\vec{v}_2,\; s_1\vec{v}_2 + s_2\vec{v}_1 + \vec{v}_1\times\vec{v}_2]$

4. **非交换性**：$ij=k$ 但 $ji=-k$，三维旋转的物理非交换性精确体现在四元数乘法中

5. **共轭**：$q^* = a - bi - cj - dk$，满足 $q \cdot q^* = |q|^2$

6. **逆元**：$q^{-1} = \\dfrac{q^*}{|q|^2}$；对于单位四元数：$q^{-1} = q^*$

7. **单位四元数**：$|\\!q\\!|=1$ 可写成 $[\cos\theta, \sin\theta \; \vec{u}]$，专门用于表示三维旋转

---

## 🎯 章节练习

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐ | 验证 $ij=k$, $ji=-k$ 等乘法规则 |
| 2 | 计算题 | ⭐ | 将四元数 $q = 1 + 2i - j + 3k$ 化为 $[s, \vec{v}]$ 形式，求模长 |
| 3 | 推导题 | ⭐⭐ | 推导纯四元数（标量=0）的 Hamilton 积 |
| 4 | 计算题 | ⭐⭐ | 计算 $q_1 = [2, (1,0,0)]$ 和 $q_2 = [3, (0,2,0)]$ 的 Hamilton 积 |
| 5 | 证明题 | ⭐⭐ | 证明四元数乘法满足结合律 |
| 6 | 计算题 | ⭐⭐ | 求 $q = [3, (1,2,0)]$ 的共轭、模长和逆元 |
| 7 | 判断题 | ⭐ | 四元数乘法是否满足分配律？是否满足交换律？ |
| 8 | 计算题 | ⭐⭐⭐ | 验证 $q_1=[1,(1,0,0)]$ 和 $q_2=[0,(0,1,0)]$ 的 $q_1 q_2$ 和 $q_2 q_1$ 不同 |

---

## 🚀 下一章预告

**第3章：四元数与三维旋转**

掌握了四元数的代数运算后，本章将揭示四元数最激动人心的应用——如何用单位四元数优雅地表示三维空间中的任意旋转，以及它为何比欧拉角和旋转矩阵更胜一筹。
`,
    3: `# 第3章：四元数与三维旋转

> **本章简介**：揭示四元数最核心的应用——如何用单位四元数优雅地描述三维空间中的任意旋转。理解轴角式旋转与单位四元数之间的精确映射，掌握四元数乘法实现三维旋转的原理，以及为何四元数比欧拉角更适合作为三维旋转的数学表示。
>
> ⏱ 预估学时：5 小时 | 难度：⭐⭐⭐ | 📍 前置：第2章（四元数代数）、第1章（旋转矩阵基础）

---

## 一、从轴角到四元数：旋转的"地址标签"

### 🔍 通俗理解

在三维空间中描述一次旋转，只需要两个信息：
- **一个旋转轴**：比如"绕穿过我身体中心的这根竖棍旋转"
- **一个旋转角**：比如"旋转 45°"

这叫做**轴角式旋转**（Axis-Angle Representation），记作 $(\vec{u}, \theta)$，其中 $\vec{u}$ 是单位轴向量，$\theta$ 是旋转角度。

**为什么四元数能做到？** 请回忆第2章的单位四元数形式：

$$q = [\cos\theta, \; \sin\theta \; \vec{u}]$$

这条公式本身就是轴角式旋转的精确定量描述！

> 🎯 **生活类比**：把三维旋转想象成拧螺丝刀。轴 $\vec{u}$ 决定螺丝刀指向哪个方向（轴），旋转角 $\theta$ 决定你拧了多少圈。四元数 $q = [\cos\theta, \sin\theta\;\vec{u}]$ 就是这把"螺丝刀"的数学表示。

---

<details class="def-box" open>
<summary>📖 定义 1：轴角式旋转到单位四元数的映射</summary>

设三维空间中任意旋转由**轴** $\vec{u} = (u_x, u_y, u_z)$（单位向量，$|\vec{u}|=1$）和**旋转角** $\theta$ 唯一确定，则对应的**单位四元数**为：

$$\boxed{q = \left[\cos\frac{\theta}{2}, \;\sin\frac{\theta}{2}\; \vec{u}\right] = \cos\frac{\theta}{2} + \sin\frac{\theta}{2}(u_x i + u_y j + u_z k)}$$

其中 $|\!q\!| = 1$。

**逆映射**（从单位四元数到轴角）：

$$s = \cos\frac{\theta}{2} \implies \theta = 2\arccos(s)$$

$$\vec{u} = \frac{\vec{v}}{\sin\frac{\theta}{2}}$$

**重要特例**：

| 旋转描述 | 轴角 $(\vec{u}, \theta)$ | 对应四元数 $q$ |
|---------|------------------------|----------------|
| 不旋转 | 任意轴，$\theta = 0$ | $[1, \vec{0}] = 1$ |
| 绕 X 轴旋转 180° | $(1,0,0),\; \pi$ | $[0, (1,0,0)] = i$ |
| 绕 Y 轴旋转 180° | $(0,1,0),\; \pi$ | $[0, (0,1,0)] = j$ |
| 绕 Z 轴旋转 90° | $(0,0,1),\; \pi/2$ | $[\cos\frac{\pi}{4}, (0,0,\sin\frac{\pi}{4})] = \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}k$ |

> ⚠️ **关键观察**：旋转角用 $\theta/2$ 而不是 $\theta$！这与四元数的**双覆盖**（double cover）性质密切相关。

</details>

---

## 二、四元数乘法实现三维旋转

### 🔍 通俗理解

现在到了本章最核心的部分：用四元数乘法来旋转三维空间中的一个点。

**三步走策略**：
1. 把三维点 $(x, y, z)$ 写成**纯四元数**：$p = [0, (x, y, z)]$
2. 取表示旋转的单位四元数 $q$（绕某轴旋转某角）
3. **双侧乘法**：$p' = q \cdot p \cdot q^{-1}$

**为什么是两边都乘 $q$？** 单侧乘法 $q \cdot p$ 会改变四元数的模长，而 $q \cdot p \cdot q^{-1}$ 保证：
- $p'$ 仍是纯四元数（标量部分 = 0）
- $|p'| = |p|$（长度不变 = 刚体旋转）

> 🎯 **生活类比**：把纯四元数 $p$ 想成一只风筝的**位置**。四元数乘法 $q \cdot p \cdot q^{-1}$ 就像是同时握住风筝的两只手（左手在 $q$ 处，右手在 $q^{-1}$ 处），然后双手一起旋转，带动风筝从位置 $p$ 移动到 $p'$。

---

<details class="proof-box" open>
<summary>📐 推导：$q p q^{-1}$ 实现三维旋转的数学证明</summary>

**目标**：证明对于任意纯四元数 $p = [0, \vec{v}]$ 和单位四元数 $q = [s, \vec{u}]$，$p' = q p q^{-1}$ 仍然是纯四元数。

**第一步**：计算 $q \cdot p$（Hamilton 积公式）：
$$q \cdot p = [-\vec{u}\cdot\vec{v},\; s\vec{v} + \vec{u}\times\vec{v}]$$

**第二步**：右乘 $q^{-1} = [s, -\vec{u}]$，展开后标量部分化简为 0（纯四元数保持纯四元数），向量部分化简为 Rodrigues 旋转公式：

$$\boxed{\vec{v}' = \vec{v}\cos\theta + (\vec{u}\times\vec{v})\sin\theta + \vec{u}(\vec{u}\cdot\vec{v})(1-\cos\theta)}$$

这正是**Rodrigues 旋转公式**——即 $\vec{v}$ 绕 $\vec{u}$ 轴旋转 $\theta$ 角度后的向量。□ 证毕

</details>

---

## 三、与旋转矩阵的相互转换

---

<details class="def-box" open>
<summary>📖 定义 2：单位四元数 → 旋转矩阵</summary>

设单位四元数 $q = [s, (x, y, z)]$（$s^2 + x^2 + y^2 + z^2 = 1$），对应的 $3\times3$ 旋转矩阵 $R$ 为：

$$\boxed{R = \begin{pmatrix} 1-2(y^2+z^2) & 2(xy - sz) & 2(xz + sy) \\ 2(xy + sz) & 1-2(x^2+z^2) & 2(yz - sx) \\ 2(xz - sy) & 2(yz + sx) & 1-2(x^2+y^2) \end{pmatrix}}$$

**验证正交性**：$R R^T = I$（因为 $|\!q\!|=1$）

</details>

<details class="def-box" open>
<summary>📖 定义 3：旋转矩阵 → 单位四元数（Shepperd 方法）</summary>

从旋转矩阵 $R$ 提取四元数（Shepperd 方法）：

$$4s = \sqrt{1 + r_{11} + r_{22} + r_{33}}$$
$$4x = \sqrt{1 + r_{11} - r_{22} - r_{33}} \cdot \text{sign}(r_{32} - r_{23})$$
$$4y = \sqrt{1 - r_{11} + r_{22} - r_{33}} \cdot \text{sign}(r_{13} - r_{31})$$
$$4z = \sqrt{1 - r_{11} - r_{22} + r_{33}} \cdot \text{sign}(r_{21} - r_{12})$$

然后归一化：$[s, x, y, z] / \sqrt{s^2+x^2+y^2+z^2}$。

> **实际建议**：直接使用 \`scipy.spatial.transform.Rotation\`：
\`\`\`python
from scipy.spatial.transform import Rotation as R_scipy
r = R_scipy.from_matrix(R)
quat = r.as_quat()  # 返回 [x, y, z, w]
\`\`\`

</details>

---

## 四、万向锁（Gimbal Lock）

### 🔍 通俗理解

**万向锁何时发生？** 当欧拉角的第二次旋转（pitch）达到 ±90° 时，第一次旋转的轴和第三次旋转的轴对齐了！此时丢失了一个自由度——无论怎么调整第三角，都无法区分某些不同的旋转。

**四元数如何避免万向锁？** 四元数不依赖欧拉角的分解，始终以"绕某轴旋转某角"的完整形式存储旋转。没有任何中间步骤会被"锁死"。

---

<details class="def-box" open>
<summary>📖 定义 4：万向锁的数学本质</summary>

欧拉角到旋转矩阵的映射（Z-X-Z 欧拉角为例）：$R = R_z(\alpha) R_x(\beta) R_z(\gamma)$

当 $\beta = \pm\frac{\pi}{2}$（即 90°）时，$R_z(\alpha)$ 和 $R_z(\gamma)$ 的旋转轴变成相同的方向。两个独立参数（α 和 γ）变成了**一个参数**（α+γ）！这就是自由度的丢失。

**四元数的万向锁免疫性**：四元数空间是一个**连续的四维球面** $S^3$（无奇点），而欧拉角空间是一个有孔洞和奇点的三维流形。

</details>

---

## 五、双覆盖问题

### 🔍 通俗理解

四元数有一个有趣也令人困惑的特性：**一个三维旋转对应两个四元数**，它们恰好互为相反数。$q$ 和 $-q$ 描述的是完全相同的旋转！这叫做**双覆盖**（Double Cover）。

**为什么是 $\theta/2$ 而不是 $\theta$？** 当旋转角 $\theta = 2\pi$ 时（全圈）：$q = [\cos \pi, \sin \pi\;\vec{u}] = [-1, \vec{0}] = -1$。注意！$\theta = 0$ 和 $\theta = 2\pi$ 都代表"不旋转"，但对应四元数 $1$ 和 $-1$ 两个值。每转一整圈（360°），四元数才走完一个完整周期。

---

<details class="def-box" open>
<summary>📖 定义 5：双覆盖的数学证明</summary>

**定理**：设 $q = [\cos\frac{\theta}{2},\; \sin\frac{\theta}{2}\;\vec{u}]$ 是绕轴 $\vec{u}$ 旋转角 $\theta$ 的单位四元数，则 $-q$ 描述**完全相同的旋转**。

**证明**：对任意纯四元数 $p = [0, \vec{v}]$：

$$(-q) p (-q)^{-1} = (-q) p (-q^{-1}) = (-1)(q p q^{-1})(-1) = q p q^{-1}$$

两个结果完全相同！□ 证毕

**实际影响**：
1. SLERP 插值时在 $q$ 和 $-q$ 之间可能走错误路径，应先点积判断
2. 存储时无影响：$q$ 和 $-q$ 数学上等效，任选其一存储即可
3. 连续旋转时每帧选择"近的一侧"的四元数，避免跳变

</details>

---

## 六、代码实现：三维旋转的完整工程

\`\`\`python
import numpy as np
from scipy.spatial.transform import Rotation as R_scipy

def axis_angle_to_quaternion(axis, angle_deg):
    """轴角 -> 单位四元数"""
    axis = np.array(axis, dtype=float)
    axis = axis / np.linalg.norm(axis)
    theta = np.radians(angle_deg)
    return np.array([np.cos(theta/2),
                     np.sin(theta/2)*axis[0],
                     np.sin(theta/2)*axis[1],
                     np.sin(theta/2)*axis[2]])

def quaternion_to_matrix(q):
    """单位四元数 -> 旋转矩阵"""
    s, x, y, z = q / np.linalg.norm(q)
    return np.array([
        [1-2*(y**2+z**2), 2*(x*y-s*z),   2*(x*z+s*y)],
        [2*(x*y+s*z),     1-2*(x**2+z**2), 2*(y*z-s*x)],
        [2*(x*z-s*y),     2*(y*z+s*x),    1-2*(x**2+y**2)]
    ])

def quaternion_rotate(vec, q):
    """四元数旋转: p' = q * p * q^{-1}"""
    def hamilton(a, b):
        return np.array([
            a[0]*b[0] - a[1]*b[1] - a[2]*b[2] - a[3]*b[3],
            a[0]*b[1] + a[1]*b[0] + a[2]*b[3] - a[3]*b[2],
            a[0]*b[2] - a[1]*b[3] + a[2]*b[0] + a[3]*b[1],
            a[0]*b[3] + a[1]*b[2] - a[2]*b[1] + a[3]*b[0],
        ])
    q_arr = np.array(q) / np.linalg.norm(q)
    q_conj = q_arr * np.array([1, -1, -1, -1])
    p_vec = np.array([0, vec[0], vec[1], vec[2]])
    p_prime = hamilton(hamilton(q_arr, p_vec), q_conj)
    return p_prime[1:4]

def slerp(q1, q2, t):
    """球面线性插值（SLERP）"""
    q1, q2 = np.array(q1, dtype=float), np.array(q2, dtype=float)
    dot = np.dot(q1, q2)
    if dot < 0: q2 = -q2; dot = -dot
    dot = np.clip(dot, -1.0, 1.0)
    theta_0 = np.arccos(dot)
    theta = theta_0 * t
    if abs(theta_0) < 1e-3:
        return q1 * (1 - t) + q2 * t
    return (q1 * np.sin(theta_0 - theta) + q2 * np.sin(theta)) / np.sin(theta_0)

# 验证：四元数旋转 = 矩阵旋转
q_z90 = axis_angle_to_quaternion([0,0,1], 90)
vec = np.array([1., 0., 0.])
print("四元数旋转:", quaternion_rotate(vec, q_z90).round(6))
print("矩阵旋转: ", (quaternion_to_matrix(q_z90) @ vec).round(6))

# SLERP 演示
q1 = np.array([1., 0., 0., 0.])  # 恒等
q2 = axis_angle_to_quaternion([0,0,1], 90)
for t in [0, 0.5, 1]:
    qt = slerp(q1, q2, t)
    print(f"t={t}: 等效旋转角={2*np.degrees(np.arccos(np.clip(qt[0],-1,1))):.1f}°")
\`\`\`

---

## 📝 本章要点速记

1. **轴角 → 四元数**：$q = [\cos\frac{\theta}{2},\; \sin\frac{\theta}{2}\;\vec{u}]$

2. **四元数旋转公式**：$p' = q \cdot p \cdot q^{-1}$（双侧乘法）

3. **旋转矩阵 ↔ 四元数**：可相互精确转换，四元数 4 参数 vs 旋转矩阵 9 参数

4. **Rodrigues 公式**：与四元数旋转等价，是叉积/点积形式的直接旋转公式

5. **万向锁的本质**：欧拉角参数化的奇异性，四元数无奇点（$S^3$ 球面无孔洞）

6. **双覆盖**：$q$ 和 $-q$ 描述同一旋转；全旋转（360°）对应四元数走 720°

7. **SLERP**：球面线性插值，比矩阵插值更平滑

---

## 🎯 章节练习

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 将"绕 Z 轴旋转 60°"写成四元数 |
| 2 | 计算题 | ⭐⭐ | 验证 $q p q^{-1}$ 对 $p=[0,(1,0,0)]$ 等于 $R_z(\theta)(1,0,0)$ |
| 3 | 推导题 | ⭐⭐ | 推导绕 X 轴的单位四元数对应的旋转矩阵 |
| 4 | 判断题 | ⭐⭐ | 解释为什么欧拉角会发生万向锁，而四元数不会 |
| 5 | 计算题 | ⭐⭐ | 给定旋转矩阵，提取对应的四元数 |
| 6 | 概念题 | ⭐⭐⭐ | 解释双覆盖：为什么 $q$ 和 $-q$ 是同一旋转？|
| 7 | 代码题 | ⭐⭐⭐ | 实现 SLERP 函数 |
| 8 | 综合题 | ⭐⭐⭐ | 验证旋转顺序非交换：先 X 再 Y ≠ 先 Y 再 X |

---

## 🚀 下一章预告

**第4章：四元数的实际应用与高级话题**

掌握了四元数旋转的数学原理后，本章将深入探讨四元数在实际工程中的广泛应用：从航空航天姿态控制到游戏引擎的角色旋转，从机器人运动学到 VR/AR 中的头显追踪。
`,
---FOOTER---
  '基础物理仿真': {},
  四元数与空间变换_ch4: `# 第4章：四元数的指数与对数映射

> **本章简介**：理解四元数如何像复数一样拥有指数与对数形式，掌握 $e^q$ 与 $\ln q$ 的几何意义，理解单位四元数构成的三维流形结构。这些数学工具是 SLERP（球面线性插值）的理论基石，直接服务于第5章的插值计算。
>
> ⏱ 预估学时：4 小时 | 难度：⭐⭐⭐ | 📍 前置：第1章（欧拉公式）、第3章（四元数乘法）

---

## 一、从复数指数到四元数指数：为什么需要指数映射？

### 🔍 通俗理解

在第1章中，我们看到了复数指数 $e^{i\theta} = \cos\theta + i\sin\theta$ 的强大威力——它把"旋转 θ 角度"这件事用一个简洁的指数形式表达了出来。更妙的是，复数乘法对应旋转组合：$e^{i\alpha} \cdot e^{i\beta} = e^{i(\alpha+\beta)}$。在实际应用中，我们经常需要处理**分数次旋转**（比如旋转 45°）或**连续旋转速度**——这正是**对数**与**指数**发挥作用的地方。

- **对数** $\ln(e^{i\theta}) = i\theta$：把旋转"拆开"，问"这个旋转角到底是多少"
- **指数** $e^{i\theta/2}$：把旋转"细分"，问"半次旋转怎么做"

---

## 二、四元数指数映射的定义与推导

<details class="proof-box" open>
<summary>📐 推导：纯四元数指数 $e^{[\vec{v}]}$（泰勒级数法）</summary>

**核心思想**：利用纯四元数 $[\vec{v}]$ 的代数性质——它的平方是负的纯量。

**第一步：写出纯四元数的泰勒级数**

$$e^{[\vec{v}]} = 1 + [\vec{v}] + \frac{[\vec{v}]^2}{2!} + \frac{[\vec{v}]^3}{3!} + \frac{[\vec{v}]^4}{4!} + \cdots$$

**第二步：分析 $[\vec{v}]^2$**

设 $\vec{v} = (v_x, v_y, v_z)$，则：

$$[\vec{v}]^2 = [0, \vec{v}]^2 = [-\|\vec{v}\|^2, \vec{0}]$$

**第三步：观察幂次规律并分组**

设 $\|\vec{v}\| = \rho$，则：
- **实部**：$1 - \frac{\rho^2}{2!} + \frac{\rho^4}{4!} - \cdots = \cos\rho$
- **虚部**：$\frac{[\vec{v}]}{\rho}\sin\rho$

$$\boxed{e^{[\vec{v}]} = \cos\rho + \frac{\vec{v}}{\rho}\sin\rho}$$

□ 证毕

</details>

---

<details class="def-box" open>
<summary>📖 定义 1：四元数指数映射（Exponential Map）</summary>

对于任意四元数 $q = [s, \vec{v}]$，记 $\|\vec{v}\| = \rho$，定义**指数映射**为：

$$e^q = e^s \cdot e^{[\vec{v}]} = e^s\left(\cos\rho + \frac{\vec{v}}{\rho}\sin\rho\right)$$

**特别情况：纯单位四元数的指数**

若 $\vec{u}$ 是单位向量，则：

$$e^{[\theta\vec{u}]} = [\cos\theta,\; \vec{u}\sin\theta]$$

这正是单位四元数表示三维旋转的标准形式！角度为 $\theta$，旋转轴为 $\vec{u}$。

</details>

---

<details class="def-box" open>
<summary>📖 定义 2：四元数对数映射（Logarithm Map）</summary>

指数映射的逆运算。对于一般四元数 $q = [s, \vec{v}]$：

$$\ln q = \left[\ln r,\; \frac{\vec{v}}{|\vec{v}|}\arccos\frac{s}{r}\right]$$

**特殊情形：单位四元数的对数**

若 $|q| = 1$（单位四元数），则：

$$\ln q = [\theta\vec{u}]$$

其中 $q = [\cos\theta, \vec{u}\sin\theta]$。这就是说 $\ln q$ 本质上记录了旋转轴方向 $\vec{u}$ 和半角 $\theta$。

</details>

---

## 三、指数与对数的几何意义：旋转的连续化

### 🔍 通俗理解

**从指数映射看旋转的时间演化：**

假设一个刚体以角速度 $\vec{\omega}$ 绕固定轴 $\vec{u}$ 旋转，每秒钟转 $\omega$ 弧度。经过时间 $t$ 秒后：

$$q(t) = e^{[\omega t \cdot \vec{u}]} = [\cos(\omega t),\; \vec{u}\sin(\omega t)]$$

这是物理学中**旋转的时间演化方程**——四元数指数映射扮演了"旋转累积器"的角色。

> 🎯 **自行车码表比喻**：想象你的自行车车轮上装了一个四元数"码表"。每当你骑车转弯，码表就记录下这次旋转的四元数 $q$。用对数运算 $\ln q$，你可以问："刚才我到底转了多少度？绕什么轴？"而指数运算 $e^q$ 则反过来："根据这个旋转信息，给我一个新的四元数。"

---

<details class="def-box" open>
<summary>📖 定义 3：四元数幂运算（Power）</summary>

利用指数与对数，可以定义任意实数次幂：

$$q^t = e^{t \ln q}$$

**单位四元数幂运算的显式公式：**

若 $q = [\cos\theta, \vec{u}\sin\theta]$ 为单位四元数，则：

$$q^t = \left[\cos(t\theta),\; \vec{u}\sin(t\theta)\right]$$

这条公式在 SLERP 插值中至关重要——它将旋转角度线性缩放，实现平滑的角度插值。

</details>

---

## 四、单位四元数的指数流形结构

### 🔍 通俗理解

单位四元数集合 $\{q \in \mathbb{H} : \|q\| = 1\}$ 构成一个**三维球面**（记作 $S^3$）。

**为什么是三维？** 四元数有4个实参数，但满足 $|q|=1$ 约束后，只剩下3个自由度——恰好等于三维旋转群的自由度。

**这就是 SLERP 的数学本质：**
- 我们在**球面**$S^3$ 上的两个四元数 $q_1, q_2$ 之间做插值
- 通过指数映射，把问题"降维"到**平坦切空间**中——在那里插值就是简单的直线
- 再用对数映射，把切空间的结果"升维"回球面

---

## 五、代码实现：四元数指数与对数

\`\`\`python
import numpy as np

class Quaternion:
    def __init__(self, w=1.0, x=0.0, y=0.0, z=0.0):
        self.w = w; self.x = x; self.y = y; self.z = z
    
    def norm(self):
        return np.sqrt(self.w**2 + self.x**2 + self.y**2 + self.z**2)
    
    @staticmethod
    def exp(q):
        s, vx, vy, vz = q.w, q.x, q.y, q.z
        rho = np.sqrt(vx**2 + vy**2 + vz**2)
        if rho < 1e-10:
            return Quaternion(np.exp(s))
        ux, uy, uz = vx/rho, vy/rho, vz/rho
        exp_s = np.exp(s)
        return Quaternion(exp_s*np.cos(rho), exp_s*ux*np.sin(rho),
                        exp_s*uy*np.sin(rho), exp_s*uz*np.sin(rho))
    
    @staticmethod
    def log(q):
        s, vx, vy, vz = q.w, q.x, q.y, q.z
        r = np.sqrt(s**2 + vx**2 + vy**2 + vz**2)
        rho = np.arccos(np.clip(s/r, -1.0, 1.0))
        if rho < 1e-10:
            return Quaternion(0.0, 0.0, 0.0, 0.0)
        sin_rho = np.sin(rho)
        return Quaternion(np.log(r), rho*vx/sin_rho, rho*vy/sin_rho, rho*vz/sin_rho)
    
    @staticmethod
    def power(q, t):
        ln_q = Quaternion.log(q)
        scaled = Quaternion(ln_q.w*t, ln_q.x*t, ln_q.y*t, ln_q.z*t)
        return Quaternion.exp(scaled)

# 验证：exp([θ·axis]) = [cosθ, axis·sinθ]
axis = np.array([1.0, 0.0, 0.0])
theta = np.pi / 3
pure_q = Quaternion(0, axis[0]*theta, axis[1]*theta, axis[2]*theta)
exp_q = Quaternion.exp(pure_q)
print(f"模长: {exp_q.norm():.6f} (应为 1.0)")
print(f"exp([θ·axis]) = [{exp_q.w:.4f}, ({exp_q.x:.4f}, {exp_q.y:.4f}, {exp_q.z:.4f})]")
print(f"期望 [cosθ, axis·sinθ] = [{np.cos(theta):.4f}, ({np.sin(theta):.4f}, 0, 0)]")
\`\`\`

---

## 📝 本章要点速记

1. **指数映射**：$e^q = e^s[\cos\rho + \frac{\vec{v}}{\rho}\sin\rho]$
2. **对数映射**：$\ln q = [\ln r, \frac{\vec{v}}{|\vec{v}|}\arccos\frac{s}{r}]$
3. **幂运算**：$q^t = e^{t\ln q}$，缩放旋转角度
4. **纯四元数指数**：$e^{[\vec{v}]} = \cos|\vec{v}| + \frac{\vec{v}}{|\vec{v}|}\sin|\vec{v}|$
5. **指数流形**：$S^3$ 流形上的 $\exp: T_{q_0}S^3 \rightarrow S^3$ 是 SLERP 的数学基础
6. **旋转时间演化**：$q(t) = e^{[\omega t \vec{u}]}$ 是刚体旋转的通解

---

## 🎯 章节练习

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 计算 $e^{[0, \pi/2, 0, 0]}$（纯四元数指数） |
| 2 | 推导题 | ⭐⭐ | 推导 $e^{[\theta\vec{u}]} \cdot e^{[\phi\vec{u}]} = e^{[(\theta+\phi)\vec{u}]}$ |
| 3 | 证明题 | ⭐⭐⭐ | 证明 $\ln(q_1 q_2) \neq \ln q_1 + \ln q_2$ |
| 4 | 计算题 | ⭐⭐ | 给定单位四元数 $q = [\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2}, 0, 0]$，求 $q^{1/3}$ |
| 5 | 概念题 | ⭐⭐ | 解释为什么单位四元数构成三维流形 $S^3$ |

---

## 🚀 下一章预告

**第5章：球面线性插值（SLERP）**

有了第4章的指数与对数映射作为数学工具，我们终于可以正式学习 SLERP——**球面线性插值**。这是计算机图形学、3D动画和航天器姿态控制中最核心的旋转插值算法。
`,
  四元数与空间变换_ch5: `# 第5章：球面线性插值（SLERP）

> **本章简介**：掌握 SLERP——球面线性插值——这是计算机图形学、3D动画、航天器姿态控制中最核心的旋转插值算法。你将理解为什么线性插值（LERP）在弯曲的球面上是"不公平"的，以及如何借助第4章的指数与对数映射，在三维旋转球面上实现真正的"匀速运动"。
>
> ⏱ 预估学时：3 小时 | 难度：⭐⭐⭐ | 📍 前置：第4章（指数与对数映射）

---

## 一、问题的引入：为什么线性插值不够用？

### 🔍 通俗理解

想象你和朋友站在地球表面的两个点上，你想从 A 点匀速走向 B 点。一个"直线行走"的计划是：每隔一秒，往 B 的方向走固定距离。但地球表面是弯曲的！如果你真的每隔一秒沿"直线方向"走固定距离，你会发现：**靠近两极时，每一步开始"打滑"**——明明走的是直线，在更高维度看你的路径其实在加速。

四元数的空间（$S^3$ 超球面）也有同样的问题。

- **LERP（线性插值）**：姿态变化先快后慢，看起来像是"先突然后拖"
- **SLERP（球面线性插值）**：姿态变化均匀一致，看起来像是"流畅巡航"

> 🎯 **骑自行车比喻**：想象你骑着自行车从山脚出发，沿一条直路向上爬坡。在陡峭的地方，你前进的**水平距离**很短；在平缓的地方，水平距离很长。SLERP 就像是一个**智能骑行调节器**，确保你水平位移的速度始终均匀。

---

## 二、LERP 的局限性与直观展示

### 🔍 通俗理解

**线性插值（LERP）**的公式：

$$\text{LERP}(q_1, q_2; t) = \frac{(1-t)q_1 + t q_2}{|(1-t)q_1 + t q_2|}$$

**LERP 的问题**：

| 问题 | 描述 |
|------|------|
| **速度不均匀** | 靠近 $q_1$ 时角速度较大，靠近 $q_2$ 时较小 |
| **路径非测地线** | 不是球面上的"大圆弧"（最短路径） |
| **可能退化** | 当 $q_1 = -q_2$ 时分子可能为零，数值不稳定 |

---

<details class="def-box" open>
<summary>📖 定义 1：线性插值（LERP）</summary>

对于两个四元数 $q_1, q_2$：

$$\text{LERP}(q_1, q_2; t) = \frac{(1-t)q_1 + t q_2}{|(1-t)q_1 + t q_2|}$$

**几何意义**：在 $\mathbb{R}^4$ 空间中做直线插值，然后投影回 $S^3$ 球面。

> 📌 什么时候可以用 LERP？当 $q_1$ 和 $q_2$ 非常接近（夹角小于约 30°）时，LERP 的误差很小，可以安全使用。

</details>

---

## 三、SLERP 的几何直觉与完整推导

### 🔍 通俗理解

SLERP 的核心思想：**不直接在弯曲的球面上插值，而是把球面"展开"到平坦的切空间中，在那里做简单的直线插值，再"卷回"球面。**

这个过程分为三步：
1. **降维（对数映射）**：把球面上的两个点 $q_1, q_2$ 映射到切空间
2. **直线插值**：在平坦的切空间中均匀插值
3. **升维（指数映射）**：把结果映射回球面

> 🎯 **地图比喻**：当你从北京飞往纽约，你想在地球表面匀速飞行。但如果看地图上的直线（墨卡托投影），地图上的直线距离并不对应地球表面的匀速飞行。SLERP 就是在大圆航线上做匀速飞行。

---

<details class="proof-box" open>
<summary>📐 推导：SLERP 公式的完整代数推导</summary>

**目标**：推导 SLERP 的显式公式。

**第一步：在切空间中表示两个四元数**

设 $q_1, q_2$ 为两个单位四元数，它们之间的夹角（弧长）为 $\Omega$：

$$\Omega = \arccos(q_1 \cdot q_2)$$

**第二步：建立几何关系**

将 $q_2$ 分解为沿 $q_1$ 的方向（平行分量）和垂直于 $q_1$ 的方向（垂直分量）：

$$q_2^\perp = q_2 - (q_1 \cdot q_2) q_1$$

归一化垂直分量：

$$\hat{q}_2^\perp = \frac{q_2 - \cos\Omega \cdot q_1}{\sin\Omega}$$

**第三步：在 $q_1$ 的切空间中做直线插值**

在切空间中均匀插值得到中间向量方向：

$$q_t^\text{tangent} = \frac{\sin((1-t)\Omega)}{\sin\Omega} q_1 + \frac{\sin(t\Omega)}{\sin\Omega} q_2^\perp$$

**第四步：将切空间结果映射回 $S^3$**

$$\boxed{\text{SLERP}(q_1, q_2; t) = \frac{\sin((1-t)\Omega)}{\sin\Omega} q_1 + \frac{\sin(t\Omega)}{\sin\Omega} q_2}$$

□ 证毕

**验证**：
- 当 $t = 0$：$\text{SLERP} = q_1$ ✅
- 当 $t = 1$：$\text{SLERP} = q_2$ ✅
- 当 $t = 0.5$：$\text{SLERP} = \frac{\sin(\Omega/2)}{\sin\Omega}(q_1 + q_2)$，恰好是弧中点 ✅

</details>

---

<details class="def-box" open>
<summary>📖 定义 2：球面线性插值（SLERP）</summary>

对于两个单位四元数 $q_1, q_2$，**球面线性插值**定义为：

$$\text{SLERP}(q_1, q_2; t) = \frac{\sin((1-t)\Omega)}{\sin\Omega} q_1 + \frac{\sin(t\Omega)}{\sin\Omega} q_2$$

其中：

$$\Omega = \arccos(q_1 \cdot q_2)$$

**参数意义**：
- $\Omega$：两个四元数在 $S^3$ 球面上的"弧长距离"
- $t \in [0, 1]$：插值参数
- $\sin$ 权重：确保插值路径恰好是球面上的大圆弧（测地线）

**性质**：

| 性质 | 描述 |
|------|------|
| 保角速度 | $t$ 均匀变化 → 角速度均匀变化 |
| 测地线 | 插值路径是 $S^3$ 上 $q_1$ 到 $q_2$ 的最短弧 |
| 可逆性 | $\text{SLERP}(q_1, q_2; t) = \text{SLERP}(q_2, q_1; 1-t)$ |

</details>

---

## 四、双覆盖问题与路径选择

### 🔍 通俗理解

四元数的**双覆盖**是重要特性：每个三维旋转对应**两个**四元数 $q$ 和 $-q$。

这在插值时带来了问题：**从 $q_1$ 到 $q_2$ 的 SLERP，和从 $q_1$ 到 $-q_2$ 的 SLERP，走的是完全不同的路径！**

**应该如何选择？** 原则很简单：**始终选择小角路径**。当 $q_1$ 和 $q_2$ 的点积为负（夹角 > 90°）时，可以把 $q_2$ 替换为 $-q_2$，这样夹角就变小了。

---

## 五、SLERP 与幂运算的等价性

### 🔍 通俗理解

SLERP 有一个简洁优雅的替代表达式，直接使用四元数的幂运算（来自第4章）：

$$\text{SLERP}(q_1, q_2; t) = q_1 \cdot \left(q_1^{-1} \cdot q_2\right)^t$$

这个公式的含义是：
1. 计算从 $q_1$ 到 $q_2$ 的"相对旋转"：$q_\Delta = q_1^{-1} \cdot q_2$
2. 把这个相对旋转缩放 $t$ 倍：$q_\Delta^t = e^{t\ln q_\Delta}$
3. 把缩放后的旋转叠加回 $q_1$：$q_t = q_1 \cdot q_\Delta^t$

---

## 六、代码实现：SLERP 及其可视化

\`\`\`python
import numpy as np

class Quaternion:
    def __init__(self, w=1.0, x=0.0, y=0.0, z=0.0):
        self.w = w; self.x = x; self.y = y; self.z = z
    
    def dot(self, other):
        return self.w*other.w + self.x*other.x + self.y*other.y + self.z*other.z
    
    def norm(self):
        return np.sqrt(self.w**2 + self.x**2 + self.y**2 + self.z**2)
    
    def normalize(self):
        n = self.norm()
        return Quaternion(self.w/n, self.x/n, self.y/n, self.z/n)
    
    def __neg__(self):
        return Quaternion(-self.w, -self.x, -self.y, -self.z)
    
    def __mul__(self, other):
        if isinstance(other, Quaternion):
            w = self.w*other.w - self.x*other.x - self.y*other.y - self.z*other.z
            x = self.w*other.x + self.x*other.w + self.y*other.z - self.z*other.y
            y = self.w*other.y - self.x*other.z + self.y*other.w + self.z*other.x
            z = self.w*other.z + self.x*other.y - self.y*other.x + self.z*other.w
            return Quaternion(w, x, y, z)
        else:
            return Quaternion(self.w*other, self.x*other, self.y*other, self.z*other)
    
    def __rmul__(self, scalar):
        return self.__mul__(scalar)
    
    def __add__(self, other):
        return Quaternion(self.w+other.w, self.x+other.x, self.y+other.y, self.z+other.z)


def slerp(q1, q2, t):
    """球面线性插值 SLERP（带双覆盖处理 + 数值稳定性保护）"""
    dot = q1.dot(q2)
    
    # 双覆盖处理 → 始终走小角路径
    if dot < 0:
        q2 = -q2
        dot = -dot
    
    # 数值稳定性
    if dot > 0.9995:
        result = q1 * (1 - t) + q2 * t
        return result.normalize()
    
    omega = np.arccos(np.clip(dot, -1.0, 1.0))
    sin_omega = np.sin(omega)
    
    a = np.sin((1 - t) * omega) / sin_omega
    b = np.sin(t * omega) / sin_omega
    
    return q1 * a + q2 * b


# ========== 验证实验 ==========
q1 = Quaternion(np.cos(np.pi/4), np.sin(np.pi/4), 0, 0)    # 绕x轴转45°
q2 = Quaternion(np.cos(np.pi/3), 0, np.sin(np.pi/3), 0)   # 绕y轴转60°
omega = np.arccos(np.clip(q1.dot(q2), -1.0, 1.0))
print(f"q1 = [{q1.w:.4f}, ({q1.x:.4f}, {q1.y:.4f}, {q1.z:.4f})]")
print(f"q2 = [{q2.w:.4f}, ({q2.x:.4f}, {q2.y:.4f}, {q2.z:.4f})]")
print(f"弧长 Ω = {np.degrees(omega):.2f}°")
print()
for t_val in [0.0, 0.25, 0.5, 0.75, 1.0]:
    q_slerp = slerp(q1, q2, t_val)
    print(f"  t={t_val:.2f} | SLERP: [{q_slerp.w:.4f}, ({q_slerp.x:.4f}, {q_slerp.y:.4f}, {q_slerp.z:.4f})]")
print()
print("✅ 所有验证实验完成！")
\`\`\`

---

## 七、实际应用场景

### 🔍 通俗理解

**1. 3D 动画与角色动画**

在游戏和电影中，一个角色从"站立"姿态平滑过渡到"举手"姿态。如果用欧拉角插值，会出现万向锁问题（Gimbal Lock）；如果用旋转矩阵插值，数值量大且不平滑。SLERP 是工业标准的解决方案。

**2. 航天器姿态控制**

航天器在太空中从一个姿态切换到另一个姿态时，必须保证角速度连续平滑。突然的角速度跳变会对结构造成冲击。SLERP 提供了姿态轨迹的数学描述，确保每次姿态调整都遵循最优路径（大圆弧）。

**3. 虚拟现实（VR）中的头显追踪**

VR 头显需要实时追踪用户头部的旋转。如果旋转插值不平滑，用户会感到不适（模拟器晕动症）。SLERP 提供了毫秒级的高质量旋转插值。

---

## 八、扩展：SQUAD（球面二次插值）

SLERP 只能在两个控制点之间做平滑插值。但在实际动画中，我们经常需要让旋转轨迹**经过多个关键帧**。

**SQUAD（Spherical Quadrangle）** 是 SLERP 的扩展，它可以平滑连接多个四元数关键帧，产生 $C^1$ 连续的旋转轨迹。

---

## 📝 本章要点速记

1. **LERP 的局限性**：在弯曲的 $S^3$ 球面上做线性插值，速度不均匀，路径非测地线
2. **SLERP 公式**：$\text{SLERP}(q_1,q_2;t) = \frac{\sin((1-t)\Omega)}{\sin\Omega}q_1 + \frac{\sin(t\Omega)}{\sin\Omega}q_2$，其中 $\Omega = \arccos(q_1 \cdot q_2)$
3. **几何本质**：通过指数/对数映射，在切空间中做直线插值，再映射回球面
4. **双覆盖处理**：始终选择小角路径（$\Omega < \pi$），必要时取反 $q_2$
5. **幂运算形式**：$\text{SLERP}(q_1,q_2;t) = q_1 \cdot (q_1^{-1} \cdot q_2)^t$
6. **SQUAD**：SLERP 的多点扩展，用于关键帧动画

---

## 🎯 章节练习

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 手动计算 $\text{SLERP}(q_1,q_2;0.5)$，$q_1=[1,0,0,0]$，$q_2=[0,1,0,0]$ |
| 2 | 推导题 | ⭐⭐ | 证明 $\text{SLERP}(q_1,q_2;0.5) = \frac{q_1+q_2}{|q_1+q_2|}$ |
| 3 | 判断题 | ⭐ | LERP 在 $q_1=-q_2$ 时会发生什么？SLERP 呢？|
| 4 | 编程题 | ⭐⭐ | 实现完整的 slerp() 函数（带双覆盖和稳定性处理）|
| 5 | 概念题 | ⭐⭐ | 解释为什么 SLERP 路径是 $S^3$ 上的测地线（大圆弧）|

---

## 🚀 课程总结

恭喜你完成了**四元数与空间变换**的全部核心章节！

| 章节 | 核心内容 | 应用场景 |
|------|---------|---------|
| 第1章 | 复数与二维旋转 | 2D 图形变换 |
| 第2章 | 四元数定义与 Hamilton 乘法 | 三维旋转代数基础 |
| 第3章 | 四元数与三维旋转的对应关系 | 刚体姿态、机器人学 |
| 第4章 | 指数与对数映射 | 旋转连续化、幂运算 |
| 第5章 | SLERP 球面线性插值 | 3D动画、航天器控制、VR |

**四元数的学习路径**：代数结构（第2章）→ 旋转表示（第3章）→ 微分结构（指数对数，第4章）→ 插值应用（SLERP，第5章）。这四步走完，你已经掌握了这门学科的核心知识！
`,
};

export function getChapterContent(slug: string, chapter: number): string | null {
  return CHAPTER_CONTENT[slug]?.[chapter] ?? null;
}
