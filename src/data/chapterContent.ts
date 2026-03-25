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

复数 z = a + bi 的共轭：$$\\bar{z} = a - bi$$

核心性质：$$z \\cdot \\bar{z} = |z|^2 = a^2 + b^2$$

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
  '数值分析': {},
  '基础物理仿真': {},
};

export function getChapterContent(slug: string, chapter: number): string | null {
  return CHAPTER_CONTENT[slug]?.[chapter] ?? null;
}
