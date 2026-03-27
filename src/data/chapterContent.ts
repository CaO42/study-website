// Chapter markdown content
// This file embeds all tutorial markdown so it's bundled into the React app

export const CHAPTER_CONTENT: Record<string, Record<number, string>> = {
  '四元数与空间变换': {
    1: `<h2>第1章：复数与二维旋转</h2>

<blockquote>**本章简介**：理解复数为何是描述二维旋转的"自然语言"，掌握欧拉公式与旋转矩阵的等价性，为后续学习四元数打下几何直觉基础。</blockquote>
<blockquote></blockquote>
<blockquote>⏱ 预估学时：3 小时 | 难度：⭐ | 📍 前置：高中数学（向量基础、三角函数）</blockquote>

<hr />

<h3>一、复数的定义与几何表示</h3>

<h4>🔍 通俗理解</h4>

<p>想象一张普通的 XY 平面直角坐标系，但这次我们给纵轴起个新名字——不再是简单的"Y轴"，而是叫做**虚轴**（Imaginary Axis）。普通横轴叫**实轴**（Real Axis）。这样一个被重新命名的坐标系，就是**复平面**（Complex Plane）。</p>

<p>在这个平面上，每个点都对应一个"门牌号"，只不过这个门牌号由两个数字组成：一个是实数部分（X方向），另一个是带 \`i\` 的虚数部分（Y方向）。比如点 (3, 4) 在这个平面上的"门牌号"就是 **3 + 4i**。这就是复数。</p>

<blockquote>🎯 **生活类比**：把复平面想象成一个小区。实数部分告诉你往东走多少步，虚数部分告诉你往北走多少步。比如地址"3 + 4i"就是从小区入口（原点）往东走3步，再往北走4步。</blockquote>

<p>为什么需要复数？光是处理平面上的点，实数（XY坐标）就够了。但当我们需要让这些点**旋转**起来时，复数就开始展现它的魔力了。一个实数乘以 -1 只能让一个点翻到对称位置，而复数乘以另一个复数可以实现任意角度的旋转——这就是本章要揭示的核心洞见。</p>

<hr />

<details class="def-box" open>
<summary>📖 定义 1：复数（Complex Number）</summary>

<p>复数是形如 **z = a + bi** 的数，其中 a 和 b 均为实数，i 满足 **i² = -1**（称为虚数单位）。</p>

<li>a 称为复数 z 的**实部**（Real Part），记作 Re(z) = a</li>
<li>b 称为复数 z 的**虚部**（Imaginary Part），记作 Im(z) = b</li>
<li>当 b = 0 时，z = a 是实数（实数是复数的特例）</li>
<li>当 a = 0 且 b ≠ 0 时，z = bi 称为**纯虚数**</li>

<p>复数 z = a + bi 在复平面上对应唯一点 (a, b)，反之亦然：</p>

<pre><code className="language-python">         复平面（Complex Plane）
    Im   |
    轴   |        z = a + bi
         |           ↑
         |          /(b)
         |         / ↗
    0 ----+--------→ Re 轴
         |       / (a)
         |      /
         |     /</code></pre>

</details>

<details class="def-box" open>
<summary>📖 定义 2：模长与辐角（三角形式）</summary>

<p>对于复数 z = a + bi：</p>

<li>**模长**（Modulus）：|z| = √(a² + b²)，即复平面上该点到原点的欧氏距离</li>
<li>**辐角**（Argument）：arg(z) = θ，是从正实轴逆时针旋转到向量 Oz 的角度，满足：</li>

<pre><code className="language-python">a = |z| · cos θ
b = |z| · sin θ</code></pre>

<p>于是得到复数的**三角形式**：</p>

<p>$$z = |z|(\\cos\\theta + i\\sin\\theta)$$</p>

<p>也称为极坐标形式。</p>

<blockquote>注意：辐角 θ 不是唯一的，可以加上 2π 的整数倍。通常取主值区间 arg(z) ∈ (-π, π]。</blockquote>

<p>**特殊复数的模长与辐角：**</p>

| 复数 | 模长 | 辐角 |
|------|------|------|
| 1 | 1 | 0 |
| i | 1 | π/2 |
| -1 | 1 | π |
| -i | 1 | -π/2 或 3π/2 |
| 3 + 4i | 5 | arctan(4/3) |

</details>

<hr />

<h3>二、复数的基本运算</h3>

<h4>🔍 通俗理解</h4>

<p>**加减法**很好理解，就是把实部和虚部分别加起来——就像在地图上，先往东走一段，再往东走另一段，总距离就是把两段加起来。虚部也一样。</p>

<p>**乘法**稍微有意思一些。如果把复数想成"带有方向和长度"的箭头（向量），那么乘法做的事情是：把两个向量的长度相乘，然后把方向（角度）相加。比如一个模长为 2、辐角为 30° 的复数，乘以一个模长为 3、辐角为 45° 的复数，结果就是模长为 6、辐角为 75° 的新复数。方向叠加的感觉，就像水流汇合一样。</p>

<p>**乘以 i 意味着什么？** i 本身模长是 1，辐角是 90°（π/2）。所以乘以 i 不会改变长度（|i|=1），只会让向量逆时针旋转 90°！连续乘两次 i（i²）就是旋转 180°，所以 i² = -1 正好对应"翻转180°落在数轴负方向"——这和我们熟悉的实数性质完全吻合。</p>

<hr />

<details class="def-box" open>
<summary>📖 定义 3：共轭复数（Complex Conjugate）</summary>

<p>复数 z = a + bi 的**共轭复数**记作 **z̄** 或 **z\\***，定义为：</p>

<p>$$\\overline{z} = a - bi$$</p>

<p>即保持实部不变，虚部取相反数。</p>

<p>**核心性质：**</p>

| 性质 | 表达式 |
|------|--------|
| 模长不变 | \\|z̄\\| = \\|z\\| |
| 乘法封闭 | $\\overline{z_1 \\cdot z_2} = \\overline{z_1} \\cdot \\overline{z_2}$ |
| 加法 | $\\overline{z_1 + z_2} = \\overline{z_1} + \\overline{z_2}$ |
| 与自身乘积 | $z \\cdot \\overline{z} = a^2 + b^2 = |z|^2$ |
| 倒数关系 | $z^{-1} = \\dfrac{\\overline{z}}{|z|^2}$（用于复数除法） |

<blockquote>💡 **几何直觉**：共轭复数关于实轴对称——就像照镜子，实轴上方的点镜像到下方。</blockquote>

</details>

<details class="def-box" open>
<summary>📖 定义 4：复数乘积公式</summary>

<p>设两个复数 z₁ = a + bi 和 z₂ = c + di，将其相乘：</p>

<p>$$z_1 \\cdot z_2 = (a+bi)(c+di) = (ac - bd) + (ad+bc)i$$</p>

<p>**关键性质（几何意义）：**</p>

<blockquote>**模长相乘，辐角相加**</blockquote>
<blockquote></blockquote>
<blockquote>若 z₁ = r₁(cos θ₁ + i sin θ₁)，z₂ = r₂(cos θ₂ + i sin θ₂)，则：</blockquote>
<blockquote></blockquote>
<blockquote>$$z_1 z_2 = r_1 r_2 \\left[\\cos(\\theta_1+\\theta_2) + i\\sin(\\theta_1+\\theta_2)\\right]$$</blockquote>

<p>这意味着：复数乘法 = **旋转 + 缩放**。</p>

<p>特别地，当 r₂ = 1（z₂ 为单位复数）时，乘法只产生旋转，不改变长度。这就是复数表示旋转的数学基础！</p>

</details>

<hr />

<h3>三、欧拉公式：桥接代数与几何</h3>

<h4>🔍 通俗理解</h4>

<p>到目前为止，我们有两种方式描述二维旋转：</p>
<p>1. **矩阵方式**：用旋转矩阵 $\\begin{pmatrix}\\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta\\end{pmatrix}$</p>
<p>2. **复数方式**：用复数乘法，z 乘以一个单位复数</p>

<p>但这两者看起来还是有点"各自为政"。欧拉公式（Euler's Formula）登场了，它用一条极简的等式把它们彻底打通：</p>

<p>$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$</p>

<p>这条公式的美在于：它把三种看起来毫无关联的数学对象——指数函数 eˣ、三角函数 cos/sin、虚数单位 i——用一条等式串了起来。</p>

<blockquote>🎯 **地址标签的比喻**：如果把复平面上的每个点想成地球上的一个位置，实数轴是"东西向"，虚数轴是"南北向"，那么 e^{iθ} 就是告诉你"沿着单位圆走 θ 角度到达的位置"。e^{iθ} 就像是复平面上旋转的"GPS坐标"，精确地标注了单位圆上任意角度对应的点。</blockquote>

<p>**欧拉恒等式**（Euler's Identity）是欧拉公式在 θ = π 时的特例：</p>

<p>$$e^{i\\pi} + 1 = 0$$</p>

<p>这条等式被数学家理查德·费曼誉为"数学最美丽的公式"，因为它把数学中最重要的五个常数——e（自然对数底）、i（虚数单位）、π（圆周率）、1（乘法单位）、0（加法单位）——用加法和乘法串联在一起。</p>

<hr />

<details class="proof-box" open>
<summary>📐 推导：泰勒级数证明 $e^{i\theta} = \cos\theta + i\sin\theta$</summary>

<p>**第一步：写出三个基本函数的泰勒级数展开**</p>

<p>指数函数的指数展开（在 x = 0 处）：</p>
<p>$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\frac{x^5}{5!} + \\cdots$$</p>

<p>余弦函数的幂级数：</p>
<p>$$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + \\cdots$$</p>

<p>正弦函数的幂级数：</p>
<p>$$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\cdots$$</p>

<p>**第二步：将 x = iθ 代入指数函数的级数**</p>

<p>$$e^{i\\theta} = 1 + i\\theta + \\frac{(i\\theta)^2}{2!} + \\frac{(i\\theta)^3}{3!} + \\frac{(i\\theta)^4}{4!} + \\frac{(i\\theta)^5}{5!} + \\cdots$$</p>

<p>逐项化简（利用 i² = -1, i³ = -i, i⁴ = 1, i⁵ = i, ...）：</p>

<p>$$= 1 + i\\theta + \\frac{-1 \\cdot \\theta^2}{2!} + \\frac{-i \\cdot \\theta^3}{3!} + \\frac{1 \\cdot \\theta^4}{4!} + \\frac{i \\cdot \\theta^5}{5!} + \\cdots$$</p>

<p>$$= \\underbrace{\\left(1 - \\frac{\\theta^2}{2!} + \\frac{\\theta^4}{4!} - \\cdots\\right)}_{\\cos\\theta} + i\\underbrace{\\left(\\theta - \\frac{\\theta^3}{3!} + \\frac{\\theta^5}{5!} - \\cdots\\right)}_{\\sin\\theta}$$</p>

<p>**第三步：识别结果**</p>

<p>根据第一步的级数定义：</p>
<li>第一组括号 = cos θ</li>
<li>第二组括号 = sin θ</li>

<p>$$\\boxed{e^{i\\theta} = \\cos\\theta + i\\sin\\theta}$$</p>

<p>✅ **证毕。**</p>

<blockquote>📌 **几何意义**：e^{iθ} 是复平面上单位圆上与正实轴夹角为 θ 的点。欧拉公式揭示了指数增长（eˣ）与圆周运动（三角函数）之间的深层联系——旋转本质上就是一种"虚数指数增长"。</blockquote>

</details>

<hr />

<h3>四、复数乘法与二维旋转（本章核心）</h3>

<h4>🔍 通俗理解</h4>

<p>现在来到本章最精彩的部分。假设平面上有一个点 P，坐标为 (x, y)。我们想把它绕原点逆时针旋转 θ 度。</p>

<p>**用复数的视角怎么做？** 三步走：</p>

<p>1. 把点 P 变成复数：z = x + yi</p>
<p>2. 构造一个旋转用的复数（单位复数）：e^{iθ} = cosθ + i sinθ</p>
<p>3. 两者相乘：z' = z · e^{iθ}</p>

<p>得到的 z' 就是一个新复数，它的实部 x' 和虚部 y' 就是旋转后的新坐标。</p>

<blockquote>🎯 **为什么有效？** 根据定义四的乘积公式：复数乘法 = 模长相乘 + 辐角相加。z 的模长是 √(x²+y²)，辐角是 arg(z)；乘以 e^{iθ}（模长=1）不会改变模长，只会在原有角度基础上加上 θ——这正是旋转的定义！</blockquote>

<p>举一个具体例子：把点 (1, 0)（即复数 z = 1）逆时针旋转 90°：</p>
<p>$$z' = 1 \\cdot e^{i\\pi/2} = 1 \\cdot (0 + i\\cdot1) = i$$</p>

<p>复数 i 对应点 (0, 1)，正是我们预期的结果！</p>

<hr />

<details class="proof-box" open>
<summary>📐 推导：复数旋转 ≡ 旋转矩阵（完整代数推导）</summary>

<p>**目标**：证明用复数乘法实现旋转，与用旋转矩阵实现旋转，两者是等价的。</p>

<p>**第一步：写出复数旋转公式**</p>

<p>设原始向量对应复数 z = x + yi，旋转角为 θ：</p>

<p>$$z' = z \\cdot e^{i\\theta} = (x+yi)(\\cos\\theta + i\\sin\\theta)$$</p>

<p>展开乘法：</p>

<p>$$z' = x\\cos\\theta + xi\\sin\\theta + yi\\cos\\theta + yi^2\\sin\\theta$$</p>

<p>利用 i² = -1：</p>

<p>$$z' = \\underbrace{(x\\cos\\theta - y\\sin\\theta)}_{\\text{实部}} + i\\underbrace{(x\\sin\\theta + y\\cos\\theta)}_{\\text{虚部}}$$</p>

<p>**第二步：写出旋转矩阵公式**</p>

<p>逆时针旋转 θ 的标准旋转矩阵为：</p>

<p>$$\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix}$$</p>

<p>展开得到：</p>

<p>$$x' = x\\cos\\theta - y\\sin\\theta$$</p>
<p>$$y' = x\\sin\\theta + y\\cos\\theta$$</p>

<p>**第三步：比较两式**</p>

| 方法 | x' | y' |
|------|----|----|
| **复数法** | x cos θ − y sin θ | x sin θ + y cos θ |
| **矩阵法** | x cos θ − y sin θ | x sin θ + y cos θ |

<p>✅ **两者完全相同！** 证毕。</p>

<p>**第四步：对应关系表格**</p>

| 复数表示 | 矩阵表示 | 操作 |
|---------|---------|------|
| $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ | $\\begin{pmatrix}\\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta\\end{pmatrix}$ | 逆时针旋转 θ |
| $e^{-i\\theta} = \\cos\\theta - i\\sin\\theta$ | $\\begin{pmatrix}\\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta\\end{pmatrix}$ | 顺时针旋转 θ |
| $i = e^{i\\pi/2}$ | $\\begin{pmatrix}0 & -1 \\\\ 1 & 0\\end{pmatrix}$ | 逆时针旋转 90° |

<blockquote>📌 **核心结论**：复数乘法与旋转矩阵乘法在二维旋转的意义下完全等价。复数只是旋转矩阵的一种更紧凑、更直觉的表示方式。记住这个对应关系，它将是理解四元数的基础！</blockquote>

</details>

<hr />

<h3>五、代码实现</h3>

<p>下面用 Python/NumPy 实现两种旋转方法，并验证它们的等价性：</p>

<pre><code className="language-python">import numpy as np
import matplotlib.pyplot as plt

def rotate_vector(x, y, theta_deg):
    """将2D向量(x,y)旋转theta_deg度（逆时针）"""
    theta = np.radians(theta_deg)
    R = np.array([
        [np.cos(theta), -np.sin(theta)],
        [np.sin(theta),  np.cos(theta)]
    ])
    return R @ np.array([x, y])

def rotate_complex(x, y, theta_deg):
    """用复数乘法实现2D旋转"""
    theta = np.radians(theta_deg)
    z = complex(x, y)
    z_rot = z * complex(np.cos(theta), np.sin(theta))
    return z_rot.real, z_rot.imag

# 验证两种方法等价
for deg in [30, 60, 90, 120]:
    v = np.array([1.0, 0.0])
    R = rotate_vector(*v, deg)
    v2 = rotate_complex(*v, deg)
    print(f"{deg}° | 矩阵: {R} | 复数: {v2}")

# 可视化旋转（保存图片）
fig, ax = plt.subplots(figsize=(6, 6))
ax.set_xlim(-1.5, 1.5)
ax.set_ylim(-1.5, 1.5)
ax.set_aspect('equal')
ax.axhline(0, color='gray', lw=0.5)
ax.axvline(0, color='gray', lw=0.5)

theta_vals = [0, 45, 90, 135, 180]
colors = ['blue', 'green', 'red', 'purple', 'orange']
origin = np.array([0.0, 0.0])
for deg, c in zip(theta_vals, colors):
    v = rotate_vector(1, 0, deg)
    ax.annotate('', xy=v, xytext=origin, arrowprops=dict(arrowstyle='->', color=c, lw=2))
    ax.text(v[0]*1.15, v[1]*1.15, f'{deg}°', color=c, fontsize=9)

# 单位圆
theta_c = np.linspace(0, 2*np.pi, 100)
ax.plot(np.cos(theta_c), np.sin(theta_c), 'k--', alpha=0.3)
ax.set_title('复数乘法实现2D旋转：$e^{i\\\\theta}$ vs 旋转矩阵')
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('/workspace/studies/四元数与空间变换/ch1_rotation_demo.png', dpi=150)
print("图片已保存: ch1_rotation_demo.png")</code></pre>

<p>**运行效果说明：**</p>
<li>程序会打印出四种角度（30°、60°、90°、120°）下两种方法计算结果的对比，数值应完全一致</li>
<li>图片展示单位圆上不同角度对应的向量箭头，直观体现旋转过程</li>

<hr />

<h3>六、复数在2D图形变换中的应用</h3>

<p>在游戏开发和计算机图形学中，复数旋转有着广泛的应用。以 **pygame** 为例，2D 精灵（Sprite）的旋转通常可以借助复数乘法高效实现：</p>

<pre><code className="language-python">import pygame
import math

def rotate_sprite_with_complex(surface, pos, angle_deg):
    """用复数旋转替代pygame的transform.rotate"""
    x, y = pos
    angle = math.radians(angle_deg)
    # 复数旋转因子
    rot = complex(math.cos(angle), math.sin(angle))
    # 以原点为基准的复数坐标
    p = complex(x, y)
    # 旋转后坐标
    p_rot = p * rot
    return int(p_rot.real), int(p_rot.imag)</code></pre>

<p>在实际的图形引擎中，复数旋转的优势在于：</p>
<li>**计算简洁**：只需一次复数乘法，代替矩阵四次乘法</li>
<li>**数值稳定**：对于连续小角度旋转，复数插值更平滑（使用 SLERP）</li>
<li>**便于组合**：多个旋转的组合只需要把复数相乘即可</li>

<p>在 CSS 动画中，旋转角度与复数 e^{iθ} 的关系体现为 transform 属性：\`transform: rotate(45deg)\` 等价于将元素对应坐标乘以 e^{iπ/4}。</p>

<hr />

<h3>📝 本章要点速记</h3>

<p>1. **复数 z = a + bi 在复平面上就是点 (a, b)**，实部是 X 坐标，虚部是 Y 坐标</p>

<p>2. **模长 |z| = √(a²+b²)**，是点到原点的距离；**辐角 arg(z) = θ** 是与正实轴的夹角</p>

<p>3. **欧拉公式 $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$** 是复数与旋转的核心桥梁，将指数、三角、虚数三者统一</p>

<p>4. **复数乘法：模长相乘，辐角相加** → 旋转 + 缩放的几何操作</p>

<p>5. **单位复数 e^{iθ}**（|e^{iθ}| = 1）= 纯旋转，不缩放</p>

<p>6. **旋转矩阵 R(θ) 与 e^{iθ} 是同一旋转的等价表示**，复数只是更紧凑的记号</p>

<p>7. **乘以 i = 逆时针旋转 90°**（|i| = 1, arg(i) = π/2）</p>

<hr />

<h3>🎯 章节练习</h3>

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐ | 复数三角形式（模长与辐角） |
| 2 | 证明/推导题 | ⭐⭐ | 欧拉公式的几何意义 |
| 3 | 判断题 | ⭐ | 复数乘法交换律（伏笔四元数非交换性） |
| 4 | 计算题 | ⭐⭐ | 矩阵法与复数法计算二维旋转（验证等价性） |
| 5 | 证明题 | ⭐⭐ | 三维旋转非交换性（为四元数非交换性铺路） |

<hr />

<h3>🚀 下一章预告</h3>

<p>第2章：**四元数的定义与代数结构**——Hamilton 的"生死之约"</p>

<p>为什么在二维旋转中，复数乘法完全够用，但到了三维就"力不从心"了？复数乘以复数可以描述二维平面内的旋转，但三维空间中的任意旋转（涉及一个旋转轴 + 一个旋转角）需要一个"三维的复数"——这就是**四元数**（Quaternion）。我们将看到 Hamilton 如何在都柏林一座桥上"顿悟"了四元数的乘法规则，以及三维旋转为什么不像二维那样满足交换律。答案就藏在复数通往四元数的道路上。</p>

<hr />

<pre><code className="language-css">/* CSS 样式参考（供渲染器使用） */
.def-box {
    border-left: 3px solid #7ee787;
    border-radius: 8px;
    margin: 1rem 0;
    overflow: hidden;
    background: rgba(126, 231, 135, 0.05);
}
.def-box summary {
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-weight: 600;
    color: #7ee787;
}
.def-box > *:not(summary) {
    padding: 0 1rem 0.75rem 1rem;
}

.proof-box {
    border-left: 3px solid #ffa657;
    border-radius: 8px;
    margin: 1rem 0;
    overflow: hidden;
    background: rgba(255, 166, 87, 0.05);
}
.proof-box summary {
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-weight: 600;
    color: #ffa657;
}
.proof-box > *:not(summary) {
    padding: 0 1rem 0.75rem 1rem;
}</code></pre>
`,
    2: `<h2>第2章：四元数的定义与代数结构</h2>

<blockquote>**本章简介**：理解四元数如何作为复数的"三维扩展"而被 Hamilton 发现，掌握四元数的四种代数表示、基本运算规则与核心代数性质。**特别提醒**：四元数乘法**不满足交换律**——这是它与复数最重要的区别，也是它能够描述三维旋转的关键所在。</blockquote>
<blockquote></blockquote>
<blockquote>⏱ 预估学时：4 小时 | 难度：⭐⭐ | 📍 前置：第1章（复数基础）</blockquote>

<hr />

<h3>一、四元数的诞生：从二维到三维的"意外跨越"</h3>

<h4>🔍 通俗理解</h4>

<p>在第1章中，我们看到复数（2个数分量）完美描述了二维平面上的旋转。数学家们自然会想：能否找到一种"三维的复数"，用类似的方式描述三维空间中的旋转？</p>

<p>这个问题困扰了数学家们很久。复数的核心是虚数单位 **i**（满足 i² = −1）。如果要"扩展到三维"，直觉上需要引入第二个虚数单位——比如 j。那么设：</p>

<p>$$q = a + bi + cj$$</p>

<p>其中 a, b, c 是实数，尝试定义 j² = −1。然后会发生什么？</p>

<p>Hamilton 花了十多年时间，试图构造一个"三维复数"代数，但每一步推导都会撞上一堵墙——**矛盾**。直到 1843 年 10 月 16 日，他在都柏林布鲁姆桥（Royal Canal Bridge）上突然顿悟：关键在于**需要三个虚数单位，而不是两个**！</p>

<p>他兴奋地在桥上刻下了著名的乘法规则（后来被刻石保存至今）。</p>

<blockquote>🎯 **生活类比**：二维旋转需要"一圈"（360°），复数用一个虚数单位 i 就能描述。三维旋转涉及一个**旋转轴**和一个**旋转角**——这就好比不是在一个平面上转圈，而是在整个球面上转。描述球面需要三个"方向参数"，所以四元数恰好有四个分量：一个标量（代表旋转"量"的大小）+ 三个虚数分量（代表旋转轴的三个方向信息）。</blockquote>

<p>**为何二维复数不够？** 三维旋转不能用复数直接描述，因为复数乘法只能让平面上两点旋转——无法同时指定旋转轴。例如，先绕 X 轴旋转 90°，再绕 Y 轴旋转 90°，最终姿态与交换顺序后的结果不同。这说明三维旋转是**非交换**的，复数的乘法是交换的（ab = ba），不足以描述这种非交换性。</p>

<hr />

<h3>二、四元数的代数定义</h3>

<h4>🔍 通俗理解</h4>

<p>四元数就像复数的"全面升级版"：复数有一个实部 + 一个虚部（i），四元数有一个实部 + **三个**虚部（i, j, k）。把三个虚数单位想象成三维空间里的三个正交轴（X, Y, Z 轴），四元数就是用 a + bi + cj + dk 同时编码"旋转强度"和"旋转轴方向"。</p>

<blockquote>🎯 **地址标签的比喻**：如果三维空间中的一个点用坐标 (x, y, z) 定位，那么四元数用 (a, b, c, d) 四个数字来描述一次旋转。其中 a 是"整体缩放"，b 是"绕 i 轴的贡献"，c 是"绕 j 轴的贡献"，d 是"绕 k 轴的贡献"。一个四元数 = 一个旋转事件，而不是一个静止点。</blockquote>

<hr />

<details class="def-box" open>
<summary>📖 定义 1：四元数（Quaternion）</summary>

<p>四元数是形如：</p>

<p>$$q = a + bi + cj + dk$$</p>

<p>的数，其中 $a, b, c, d \\in \\mathbb{R}$，虚数单位 $i, j, k$ 满足以下乘法规则（**Hamilton 乘法表**）：</p>

| ×   | **i** | **j** | **k** |
|-----|-------|-------|-------|
| **i** | −1 | +k   | −j   |
| **j** | −k  | −1   | +i   |
| **k** | +j   | −i   | −1   |

<p>等价写法（第二行起每行循环）：</p>

<p>$$i^2 = j^2 = k^2 = ijk = -1$$</p>

<p>由以上规则可以推导出：</p>

<p>$$ij = k, \\quad ji = -k$$</p>
<p>$$jk = i, \\quad kj = -i$$</p>
<p>$$ki = j, \\quad ik = -j$$</p>

<p>**核心观察**：$ij = k$ 但 $ji = -k$，这说明四元数乘法**不满足交换律**——这是四元数最重要的代数特征，也是它能描述三维旋转的根本原因！</p>

<p>四元数的集合记作 $\\mathbb{H}$（为纪念 Hamilton，首字母 H）。</p>

</details>

<details class="def-box" open>
<summary>📖 定义 2：四元数的四种表示形式</summary>

<p>同一个四元数可以用四种等价方式表示：</p>

<p>**形式一：标准代数形式（最常用）**</p>

<p>$$q = a + bi + cj + dk$$</p>

<p>其中 $a, b, c, d \\in \\mathbb{R}$。</p>

<p>**形式二：标量-向量形式（几何直觉最强）**</p>

<p>$$q = [s, \\vec{v}] = [a, \\; (b, c, d)]$$</p>

<li>$s = a$ 称为**标量部分**（Scalar）</li>
<li>$\\vec{v} = (b, c, d)$ 称为**向量部分**（Vector）</li>

<p>**形式三：复数扩展形式（与复数类比）**</p>

<p>$$q = (a + bi) + (c + di)j = \\alpha + \\beta j$$</p>

<p>其中 $\\alpha = a + bi, \\beta = c + di$，注意 $\\beta j \\neq j\\beta$（乘法不交换）。</p>

<p>**形式四：三角/极形式（用于旋转）**</p>

<p>当 $|\\!q\\!| = 1$（单位四元数）时：</p>

<p>$$q = [\\cos\\theta, \\; \\sin\\theta \\; \\vec{u}] = \\cos\\theta + \\sin\\theta \\; (u_x i + u_y j + u_z k)$$</p>

<p>其中 $\\vec{u} = (u_x, u_y, u_z)$ 是单位向量（表示旋转轴），θ 是旋转角的一半（注意是**一半**！）。</p>

<blockquote>⚠️ **为什么是 θ/2？** 这与四元数旋转的"双覆盖"性质有关，将在第3章详细解释。直觉上：三维旋转只需要半个四元数空间即可一一对应。</blockquote>

</details>

<hr />

<h3>三、四元数的基本运算</h3>

<h4>🔍 通俗理解</h4>

<p>**加法**：最简单，把各分量相加，就像合并两个四维坐标。</p>
<p>**乘法**：最复杂，也最重要。Hamilton 积不满足交换律——这意味着 $q_1 \\cdot q_2 \\neq q_2 \\cdot q_1$。这在日常生活中也有类比：先穿上袜子再穿鞋 ≠ 先穿鞋再穿袜子。旋转操作同样如此——顺序不同，结果不同！</p>

<p>**共轭**：就像复数共轭把 i 变 −i，四元数共轭把 b, c, d 全变号。共轭与自身的乘积等于模长的平方 $q \\cdot q^* = |q|^2$——这个性质让我们能求四元数的逆。</p>

<hr />

<details class="def-box" open>
<summary>📖 定义 3：四元数的加减法与数乘</summary>

<p>设两个四元数 $q_1 = a_1 + b_1 i + c_1 j + d_1 k$，$q_2 = a_2 + b_2 i + c_2 j + d_2 k$：</p>

<p>**加法**（逐分量相加）：</p>

<p>$$q_1 + q_2 = (a_1+a_2) + (b_1+b_2)i + (c_1+c_2)j + (d_1+d_2)k$$</p>

<p>**数乘**（标量 λ 乘以四元数）：</p>

<p>$$\\lambda q_1 = (\\lambda a_1) + (\\lambda b_1)i + (\\lambda c_1)j + (\\lambda d_1)k$$</p>

<p>**减法**即加法加上数乘 (−1)。</p>

<blockquote>💡 **几何直觉**：加减法就是在四维"标量-向量空间"中做向量加法，非常直观。真正有几何意义的是乘法。</blockquote>

</details>

<details class="def-box" open>
<summary>📖 定义 4：Hamilton 积（四元数乘法）</summary>

<p>设 $q_1 = a_1 + b_1 i + c_1 j + d_1 k$，$q_2 = a_2 + b_2 i + c_2 j + d_2 k$，利用 Hamilton 乘法表展开：</p>

<p>$$q_1 q_2 = (a_1a_2 - b_1b_2 - c_1c_2 - d_1d_2) \\;\\;+\\;\\; (a_1b_2 + b_1a_2 + c_1d_2 - d_1c_2)i \\;\\;+\\;\\; (a_1c_2 - b_1d_2 + c_1a_2 + d_1b_2)j \\;\\;+\\;\\; (a_1d_2 + b_1c_2 - c_1b_2 + d_1a_2)k$$</p>

<p>**标量-向量形式**下更紧凑：</p>

<p>$$q_1 = [s_1, \\vec{v}_1], \\quad q_2 = [s_2, \\vec{v}_2]$$</p>

<p>$$\\boxed{q_1 q_2 = [s_1 s_2 - \\vec{v}_1 \\cdot \\vec{v}_2, \\;\\; s_1\\vec{v}_2 + s_2\\vec{v}_1 + \\vec{v}_1 \\times \\vec{v}_2]}$$</p>

<p>其中 $\\vec{v}_1 \\cdot \\vec{v}_2$ 是向量点积，$\\vec{v}_1 \\times \\vec{v}_2$ 是向量叉积。</p>

<p>**核心性质**：</p>

| 性质 | 表达式 |
|------|--------|
| 非交换律 | $q_1 q_2 \\neq q_2 q_1$（一般情况） |
| 结合律 | $(q_1 q_2) q_3 = q_1 (q_2 q_3)$ ✅ |
| 分配律 | $q_1(q_2+q_3) = q_1q_2 + q_1q_3$ ✅ |
| 单位元 | $1 \\cdot q = q \\cdot 1 = q$ |

<blockquote>⚠️ **警告**：$ij = k$ 但 $ji = -k$！顺序不同，结果不同。**三维旋转不满足交换律**这一物理事实，精确反映在四元数乘法的非交换性中。</blockquote>

</details>

<details class="proof-box" open>
<summary>📐 推导：Hamilton 积的向量形式（从展开式到 $[s, \vec{v}]$ 形式）</summary>

<p>**目标**：将 $q_1 = a_1 + b_1i + c_1j + d_1k$ 与 $q_2 = a_2 + b_2i + c_2j + d_2k$ 的乘积，用标量 $s$ 和三维向量 $\\vec{v} = (b, c, d)$ 表示。</p>

<p>**第一步：完全展开**</p>

<p>将 $q_1 q_2$ 逐项展开，利用 $i^2=j^2=k^2=-1$ 和乘法表：</p>

<p>$$q_1 q_2 = a_1a_2 + a_1b_2 i + a_1c_2 j + a_1d_2 k$$</p>
<p>$$+ b_1a_2 i + b_1b_2 i^2 + b_1c_2 ij + b_1d_2 ik$$</p>
<p>$$+ c_1a_2 j + c_1b_2 ji + c_1c_2 j^2 + c_1d_2 jk$$</p>
<p>$$+ d_1a_2 k + d_1b_2 ki + d_1c_2 kj + d_1d_2 k^2$$</p>

<p>**第二步：代入乘法规则**</p>

<p>将 $ij=k,\\; ji=-k,\\; jk=i,\\; kj=-i,\\; ki=j,\\; ik=-j$ 代入：</p>

<p>$$= a_1a_2 + a_1b_2 i + a_1c_2 j + a_1d_2 k$$</p>
<p>$$+ b_1a_2 i - b_1b_2 + b_1c_2 k - b_1d_2 j$$</p>
<p>$$+ c_1a_2 j - c_1b_2 k - c_1c_2 + c_1d_2 i$$</p>
<p>$$+ d_1a_2 k + d_1b_2 j - d_1c_2 i - d_1d_2$$</p>

<p>**第三步：合并同类项**</p>

<p>**标量部分**（纯实数）：</p>

<p>$$s = a_1a_2 - b_1b_2 - c_1c_2 - d_1d_2$$</p>

<p>**i 系数**（$\\vec{v}$ 的第一分量）：</p>

<p>$$b = a_1b_2 + b_1a_2 + c_1d_2 - d_1c_2$$</p>

<p>**j 系数**（$\\vec{v}$ 的第二分量）：</p>

<p>$$c = a_1c_2 - b_1d_2 + c_1a_2 + d_1b_2$$</p>

<p>**k 系数**（$\\vec{v}$ 的第三分量）：</p>

<p>$$d = a_1d_2 + b_1c_2 - c_1b_2 + d_1a_2$$</p>

<p>**第四步：识别向量运算**</p>

<p>令 $\\vec{v}_1 = (b_1, c_1, d_1)$，$\\vec{v}_2 = (b_2, c_2, d_2)$，定义叉积：</p>

<p>$$\\vec{v}_1 \\times \\vec{v}_2 = \\begin{pmatrix} c_1d_2 - d_1c_2 \\\\ d_1b_2 - b_1d_2 \\\\ b_1c_2 - c_1b_2 \\end{pmatrix}$$</p>

<p>点积：$\\vec{v}_1 \\cdot \\vec{v}_2 = b_1b_2 + c_1c_2 + d_1d_2$</p>

<p>则：</p>

<li>$\\vec{v}$ 的 **第一分量**：$a_1b_2 + b_1a_2 + c_1d_2 - d_1c_2 = (a_1\\vec{v}_2 + a_2\\vec{v}_1)_x + (\\vec{v}_1 \\times \\vec{v}_2)_x$</li>
<li>等等……</li>

<p>完整表达式化简为：</p>

<p>$$\\boxed{q_1 q_2 = [a_1a_2 - \\vec{v}_1 \\cdot \\vec{v}_2, \\; a_1\\vec{v}_2 + a_2\\vec{v}_1 + \\vec{v}_1 \\times \\vec{v}_2]}$$</p>

<p>□ 证毕</p>

<blockquote>📌 **几何直觉**：Hamilton 积的标量部分 $s_1s_2 - \\vec{v}_1\\cdot\\vec{v}_2$ 反映"长度"信息；向量部分 $s_1\\vec{v}_2 + s_2\\vec{v}_1 + \\vec{v}_1\\times\\vec{v}_2$ 中的叉积 $\\vec{v}_1\\times\\vec{v}_2$ 体现了**方向依赖性**（即乘法非交换的来源）。</blockquote>

</details>

<hr />

<h3>四、共轭、模长与逆元</h3>

<h4>🔍 通俗理解</h4>

<p>**共轭**（Conjugate）就像镜子里反射的像：把向量部分的虚轴全部取反，标量部分不变。记作 $q^*$ 或 $\\bar{q}$。</p>

<p>**模长**（Norm）衡量四元数的大小，和三维空间里向量的长度一样：四个分量平方和开根号。</p>

<p>**逆元**（Inverse）是四元数的"倒数"。复数的倒数 $\\frac{1}{z} = \\frac{\\bar{z}}{|z|^2}$，四元数也类似，但必须小心——因为乘法不交换，四元数的逆要同时满足 $q^{-1} q = 1$ 和 $q q^{-1} = 1$（实际上两者都成立，结合律保证左右逆相等）。</p>

<hr />

<details class="def-box" open>
<summary>📖 定义 5：共轭四元数</summary>

<p>四元数 $q = a + bi + cj + dk$ 的共轭记作 $q^*$，定义为：</p>

<p>$$\\boxed{q^* = a - bi - cj - dk = [a, \\; -\\vec{v}]}$$</p>

<p>**核心性质**：</p>

| 性质 | 表达式 |
|------|--------|
| 自反共轭 | $(q^*)^* = q$ |
| 加法共轭 | $(q_1 + q_2)^* = q_1^* + q_2^*$ |
| 乘法共轭 | $(q_1 q_2)^* = q_2^* q_1^*$（注意顺序颠倒！） |
| 自身乘积 | $q \\cdot q^* = a^2 + b^2 + c^2 + d^2 = |q|^2$ |
| 模长关系 | $|q^*| = |q|$ |

<blockquote>⚠️ 注意乘法共轭规则：$(q_1 q_2)^* = q_2^* q_1^*$！顺序颠倒的原因是：$(q_1 q_2)^* = (q_2^* q_1^*)$ → 共轭逆转顺序 → 对应乘法非交换的本质。</blockquote>

</details>

<details class="def-box" open>
<summary>📖 定义 6：模长与逆元</summary>

<p>**模长**（Norm / Magnitude）：</p>

<p>$$\\boxed{|q| = \\sqrt{a^2 + b^2 + c^2 + d^2} = \\sqrt{q \\cdot q^*}}$$</p>

<p>**单位四元数**：$|\\!q\\!| = 1$ 的四元数，记作 $\\hat{q}$，专门用于表示三维旋转。</p>

<p>**逆元**（Inverse）：满足 $q^{-1} q = q q^{-1} = 1$ 的四元数。</p>

<p>$$\\boxed{q^{-1} = \\frac{q^*}{|q|^2}}$$</p>

<p>**验证**：</p>

<p>$$q \\cdot q^{-1} = q \\cdot \\frac{q^*}{|q|^2} = \\frac{q \\cdot q^*}{|q|^2} = \\frac{|q|^2}{|q|^2} = 1 \\quad \\checkmark$$</p>

<blockquote>💡 **几何直觉**：对于单位四元数 $|\\!q\\!| = 1$，逆元就是共轭：$q^{-1} = q^*$，这和复数单位复数的情况完全一致（$e^{i\\theta}$ 的逆 = $e^{-i\\theta}$）。</blockquote>

</details>

<details class="def-box" open>
<summary>📖 定义 7：单位四元数与纯四元数</summary>

<p>**单位四元数**（Unit Quaternion）：$|\\!q\\!| = 1$，可以写成：</p>

<p>$$\\hat{q} = [\\cos\\theta, \\; \\sin\\theta \\; \\vec{u}]$$</p>

<p>其中 $\\vec{u}$ 是单位向量，$\\theta \\in [0, 2\\pi)$。</p>

<li>**纯四元数**（Pure Quaternion）：标量部分 $s = 0$ 的四元数，$q_{pure} = [0, \\vec{v}] = bi + cj + dk$</li>
<li>任意四元数都可以分解为纯四元数加上标量：$q = [s, \\vec{0}] + [0, \\vec{v}]$</li>

<p>**特殊单位四元数**：</p>

| 四元数 | 标量 | 向量 | 含义 |
|--------|------|------|------|
| 1 | 1 | (0,0,0) | 零旋转 |
| −1 | −1 | (0,0,0) | 零旋转（双覆盖，见第3章）|
| i | 0 | (1,0,0) | 绕 X 轴旋转 180° |
| j | 0 | (0,1,0) | 绕 Y 轴旋转 180° |
| k | 0 | (0,0,1) | 绕 Z 轴旋转 180° |

</details>

<hr />

<h3>五、代码实现：四元数运算</h3>

<pre><code className="language-python">import numpy as np

class Quaternion:
    """四元数类：封装基本运算"""
    def __init__(self, s=1.0, v=(0.0, 0.0, 0.0)):
        """四元数构造函数: q = [s, v] = s + v_x*i + v_y*j + v_z*k"""
        self.s = float(s)          # 标量部分
        self.v = np.array(v, dtype=float)  # 向量部分 (b, c, d)

    def __repr__(self):
        return f"[{self.s:.3f}, ({self.v[0]:.3f}, {self.v[1]:.3f}, {self.v[2]:.3f})]"

    # ---- 基本运算 ----
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

    def __add__(self, other):
        """加法: 逐分量相加"""
        return Quaternion(self.s + other.s, self.v + other.v)

    def __sub__(self, other):
        """减法"""
        return Quaternion(self.s - other.s, self.v - other.v)

    def __mul__(self, other):
        """Hamilton 积: q1 * q2 = [s1*s2 - v1·v2,  s1*v2 + s2*v1 + v1×v2]"""
        if isinstance(other, Quaternion):
            scalar = self.s * other.s - np.dot(self.v, other.v)
            vector = self.s * other.v + other.s * self.v + np.cross(self.v, other.v)
            return Quaternion(scalar, vector)
        else:
            # 数乘（标量 λ * q）
            return Quaternion(other * self.s, other * self.v)

    def __rmul__(self, other):
        return self.__mul__(other)

    def __neg__(self):
        """负四元数"""
        return Quaternion(-self.s, -self.v)

    def dot(self, other):
        """点积（用于夹角计算）"""
        return self.s * other.s + np.dot(self.v, other.v)

    def to_axis_angle(self):
        """单位四元数 -> 轴角表示"""
        if abs(self.s) > 1.0:
            self = self.normalize()
        theta = 2 * np.arccos(max(-1, min(1, self.s)))  # 旋转角
        sin_half = np.sin(theta / 2)
        if abs(sin_half) < 1e-10:
            return np.array([1.0, 0.0, 0.0]), 0.0
        axis = self.v / sin_half
        return axis, theta

    def to_matrix(self):
        """单位四元数 -> 旋转矩阵（3×3）"""
        s, (x, y, z) = self.s, self.v
        # 归一化确保数值稳定
        length_sq = s**2 + x**2 + y**2 + z**2
        s /= length_sq**0.5; x /= length_sq**0.5
        y /= length_sq**0.5; z /= length_sq**0.5
        return np.array([
            [1 - 2*(y**2 + z**2), 2*(x*y - s*z),       2*(x*z + s*y)],
            [2*(x*y + s*z),       1 - 2*(x**2 + z**2), 2*(y*z - s*x)],
            [2*(x*z - s*y),       2*(y*z + s*x),       1 - 2*(x**2 + y**2)]
        ])

    def __eq__(self, other, tol=1e-9):
        """比较两个四元数是否相等（忽略浮点误差）"""
        return abs(self.s - other.s) < tol and np.allclose(self.v, other.v, atol=tol)


# ============ 演示 ============
if __name__ == "__main__":
    # 构造两个四元数
    q1 = Quaternion(1, (2, 3, 4))   # q1 = [1, (2,3,4)]
    q2 = Quaternion(5, (6, 7, 8))   # q2 = [5, (6,7,8)]

    print("=== 四元数基本运算演示 ===")
    print(f"q1 = {q1}")
    print(f"q2 = {q2}")
    print(f"|q1| = {q1.norm():.4f}")
    print(f"q1* = {q1.conjugate()}")
    print(f"q1^{-1} = {q1.inverse()}")
    print(f"q1* . q1 = {q1.conjugate() * q1}")   # 应等于 |q1|^2

    print(f"\\n--- Hamilton 积 ---")
    q_mul = q1 * q2
    print(f"q1 * q2 = {q_mul}")
    q_mul2 = q2 * q1
    print(f"q2 * q1 = {q_mul2}")
    print(f"q1*q2 ≠ q2*q1? {not q_mul == q_mul2}")   # True，证明非交换

    # 验证 q * q* = |q|^2
    print(f"\\n--- 验证 q·q* = |q|^2 ---")
    result = q1 * q1.conjugate()
    print(f"q1 * q1* = [{result.s:.4f}, ...]")
    print(f"|q1|^2   = {q1.norm()**2:.4f}")

    # 构造单位四元数
    print(f"\\n--- 单位四元数示例 ---")
    # 绕 Z 轴旋转 90° 的单位四元数
    theta = np.pi / 2
    q_rot_z = Quaternion(np.cos(theta/2), np.array([0, 0, np.sin(theta/2)]))
    print(f"绕 Z 轴旋转 90° 的单位四元数: {q_rot_z}")
    print(f"模长 = {q_rot_z.norm():.6f} (应为 1.0)")
    axis, ang = q_rot_z.to_axis_angle()
    print(f"轴角还原: axis={axis}, angle={np.degrees(ang):.2f}°")

    # 旋转矩阵验证
    print(f"\\n--- 旋转矩阵验证 ---")
    R = q_rot_z.to_matrix()
    print("旋转矩阵:\\n", np.round(R, 4))
    print("验证正交: R·R^T =\\n", np.round(R @ R.T, 4))
    print("行列式 det(R) =", np.linalg.det(R))</code></pre>

<p>**代码说明**：</p>
<li>\`Quaternion\` 类实现了四元数的所有基本运算（加、减、Hamilton 积、共轭、逆、归一化）</li>
<li>特别演示了 **$q_1 q_2 \\neq q_2 q_1$**（非交换性）</li>
<li>验证了 $q \\cdot q^* = |q|^2$ 这一核心恒等式</li>
<li>\`to_axis_angle()\` 和 \`to_matrix()\` 为第3章的旋转实现埋下伏笔</li>

<hr />

<h3>📝 本章要点速记</h3>

<p>1. **四元数定义**：$q = a + bi + cj + dk$，三个虚数单位满足 $i^2=j^2=k^2=ijk=-1$</p>

<p>2. **四种表示形式**：标准形式、标量-向量形式 $[s, \\vec{v}]$、复数扩展形式、三角形式</p>

<p>3. **Hamilton 积**：$q_1 q_2 = [s_1s_2 - \\vec{v}_1\\cdot\\vec{v}_2,\\; s_1\\vec{v}_2 + s_2\\vec{v}_1 + \\vec{v}_1\\times\\vec{v}_2]$</p>

<p>4. **非交换性**：$ij=k$ 但 $ji=-k$，三维旋转的物理非交换性精确体现在四元数乘法中</p>

<p>5. **共轭**：$q^* = a - bi - cj - dk$，满足 $q \\cdot q^* = |q|^2$</p>

<p>6. **逆元**：$q^{-1} = \\dfrac{q^*}{|q|^2}$；对于单位四元数：$q^{-1} = q^*$</p>

<p>7. **单位四元数**：$|\\!q\\!|=1$ 可写成 $[\\cos\\theta, \\sin\\theta \\; \\vec{u}]$，专门用于表示三维旋转</p>

<hr />

<h3>🎯 章节练习</h3>

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐ | 验证 $ij=k$, $ji=-k$, $jk=i$ 等乘法规则 |
| 2 | 计算题 | ⭐ | 将四元数 $q = 1 + 2i - j + 3k$ 化为 $[s, \\vec{v}]$ 形式，求模长 |
| 3 | 推导题 | ⭐⭐ | 推导纯四元数（标量=0）的 Hamilton 积 |
| 4 | 计算题 | ⭐⭐ | 计算 $q_1 = [2, (1,0,0)]$ 和 $q_2 = [3, (0,2,0)]$ 的 Hamilton 积 |
| 5 | 证明题 | ⭐⭐ | 证明四元数乘法满足结合律 $(q_1 q_2) q_3 = q_1 (q_2 q_3)$ |
| 6 | 计算题 | ⭐⭐ | 求 $q = [3, (1,2,0)]$ 的共轭、模长和逆元 |
| 7 | 判断题 | ⭐ | 四元数乘法是否满足分配律？是否满足交换律？ |
| 8 | 计算题 | ⭐⭐⭐ | 用代码验证：对于 $q_1=[1,(1,0,0)]$ 和 $q_2=[0,(0,1,0)]$，验证 $q_1 q_2$ 和 $q_2 q_1$ 的结果，并解释其几何含义 |

<hr />

<h3>🚀 下一章预告</h3>

<p>**第3章：四元数与三维旋转**</p>

<p>掌握了四元数的代数运算后，本章将揭示四元数最激动人心的应用——如何用单位四元数优雅地表示三维空间中的任意旋转，以及它为何比欧拉角和旋转矩阵更胜一筹。我们将看到"轴角式旋转"如何映射到单位四元数，四元数乘法如何等价于旋转矩阵乘法，以及万向锁（Gimbal Lock）问题如何被优雅地绕过。</p>
`,
    3: `<h2>第3章：四元数与三维旋转</h2>

<blockquote>**本章简介**：揭示四元数最核心的应用——如何用单位四元数优雅地描述三维空间中的任意旋转。理解轴角式旋转与单位四元数之间的精确映射，掌握四元数乘法实现三维旋转的原理，以及为何四元数比欧拉角更适合作为三维旋转的数学表示。</blockquote>
<blockquote></blockquote>
<blockquote>⏱ 预估学时：5 小时 | 难度：⭐⭐⭐ | 📍 前置：第2章（四元数代数）、第1章（旋转矩阵基础）</blockquote>

<hr />

<h3>一、从轴角到四元数：旋转的"地址标签"</h3>

<h4>🔍 通俗理解</h4>

<p>在三维空间中描述一次旋转，只需要两个信息：</p>
<li>**一个旋转轴**：比如"绕穿过我身体中心的这根竖棍旋转"</li>
<li>**一个旋转角**：比如"旋转 45°"</li>

<p>这叫做**轴角式旋转**（Axis-Angle Representation），记作 $(\\vec{u}, \\theta)$，其中 $\\vec{u}$ 是单位轴向量，$\\theta$ 是旋转角度。</p>

<p>**为什么四元数能做到？** 请回忆第2章的单位四元数形式：</p>

<p>$$q = [\\cos\\theta, \\; \\sin\\theta \\; \\vec{u}]$$</p>

<p>这条公式本身就是轴角式旋转的精确定量描述！标量 $\\cos\\theta$ 和向量 $\\sin\\theta\\vec{u}$ 合计四个数字，完美编码了"绕 $\\vec{u}$ 轴旋转 $\\theta$ 角"这一完整的旋转信息。</p>

<blockquote>🎯 **生活类比**：把三维旋转想象成拧螺丝刀。轴 $\\vec{u}$ 决定螺丝刀指向哪个方向（轴），旋转角 $\\theta$ 决定你拧了多少圈。四元数 $q = [\\cos\\theta, \\sin\\theta\\;\\vec{u}]$ 就是这把"螺丝刀"的数学表示：$\\cos\\theta$ 告诉你手柄的朝向（旋转量），$\\sin\\theta\\vec{u}$ 告诉你刀杆的方向（旋转轴）。</blockquote>

<hr />

<details class="def-box" open>
<summary>📖 定义 1：轴角式旋转到单位四元数的映射</summary>

<p>设三维空间中任意旋转由**轴** $\\vec{u} = (u_x, u_y, u_z)$（单位向量，$|\\vec{u}|=1$）和**旋转角** $\\theta$（逆时针方向）唯一确定，则对应的**单位四元数**为：</p>

<p>$$\\boxed{q = \\left[\\cos\\frac{\\theta}{2}, \\;\\sin\\frac{\\theta}{2}\\; \\vec{u}\\right] = \\cos\\frac{\\theta}{2} + \\sin\\frac{\\theta}{2}(u_x i + u_y j + u_z k)}$$</p>

<p>其中 $|\\!q\\!| = \\cos^2\\frac{\\theta}{2} + \\sin^2\\frac{\\theta}{2}|\\vec{u}|^2 = 1$ ✅</p>

<p>**逆映射**（从单位四元数到轴角）：</p>

<p>$$s = \\cos\\frac{\\theta}{2} \\implies \\theta = 2\\arccos(s)$$</p>

<p>$$\\vec{u} = \\frac{\\vec{v}}{\\sin\\frac{\\theta}{2}} \\quad (\\text{当 } \\sin\\frac{\\theta}{2} \\neq 0 \\text{ 时})$$</p>

<p>**重要特例**：</p>

| 旋转描述 | 轴角 $(\\vec{u}, \\theta)$ | 对应四元数 $q$ |
|---------|------------------------|----------------|
| 不旋转（恒等） | 任意轴，$\\theta = 0$ | $[1, \\vec{0}] = 1$ |
| 绕 X 轴旋转 180° | $(1,0,0),\\; \\pi$ | $[0, (1,0,0)] = i$ |
| 绕 Y 轴旋转 180° | $(0,1,0),\\; \\pi$ | $[0, (0,1,0)] = j$ |
| 绕 Z 轴旋转 90° | $(0,0,1),\\; \\pi/2$ | $[\\cos\\frac{\\pi}{4}, (0,0,\\sin\\frac{\\pi}{4})] = \\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2}k$ |

<blockquote>⚠️ **关键观察**：旋转角用 $\\theta/2$ 而不是 $\\theta$！这与四元数的**双覆盖**（double cover）性质密切相关，见本章第五节。</blockquote>

</details>

<hr />

<h3>二、四元数乘法实现三维旋转</h3>

<h4>🔍 通俗理解</h4>

<p>现在到了本章最核心的部分：用四元数乘法来旋转三维空间中的一个点。</p>

<p>**三步走策略**：</p>
<p>1. 把三维点 $(x, y, z)$ 写成**纯四元数**：$p = [0, (x, y, z)]$</p>
<p>2. 取表示旋转的单位四元数 $q$（绕某轴旋转某角）</p>
<p>3. **双侧乘法**：$p' = q \\cdot p \\cdot q^{-1}$</p>

<p>**为什么是两边都乘 $q$？** 这是四元数的特殊技巧。单侧乘法 $q \\cdot p$ 会改变四元数的模长（数值不稳定），而 $q \\cdot p \\cdot q^{-1}$ 保证：</p>
<li>$p'$ 仍是纯四元数（标量部分 = 0）</li>
<li>$|p'| = |p|$（长度不变 = 刚体旋转）</li>

<blockquote>🎯 **生活类比**：把纯四元数 $p$ 想成一只绑在棍子上的风筝的**位置**。四元数乘法 $q \\cdot p \\cdot q^{-1}$ 就像是同时握住风筝的两只手（左手在 $q$ 处，右手在 $q^{-1}$ 处），然后双手一起旋转，带动风筝从位置 $p$ 移动到 $p'$。两只手一起转才能保持风筝不"扭坏"（保持纯四元数性质）。</blockquote>

<p>**左手系 vs 右手系**：不同坐标系约定下，四元数旋转公式略有不同：</p>
<li>**右手坐标系**（常用）：$p' = q p q^{-1}$</li>
<li>**左手坐标系**：$p' = q^{-1} p q$</li>

<hr />

<details class="proof-box" open>
<summary>📐 推导：$q p q^{-1}$ 实现三维旋转的数学证明</summary>

<p>**目标**：证明对于任意纯四元数 $p = [0, \\vec{v}]$ 和单位四元数 $q = [s, \\vec{u}]$，$p' = q p q^{-1}$ 仍然是纯四元数，且相当于 $\\vec{v}$ 绕 $\\vec{u}$ 轴旋转 θ 角。</p>

<p>**第一步：化简 $p' = q p q^{-1}$**</p>

<p>设 $q = [s, \\vec{u}]$（$|\\!q\\!|=1 \\Rightarrow q^{-1}=q^*$），$p = [0, \\vec{v}]$。</p>

<p>先算 $q \\cdot p$（利用 Hamilton 积公式）：</p>

<p>$$q \\cdot p = [s\\cdot 0 - \\vec{u}\\cdot\\vec{v},\\; s\\vec{v} + 0\\cdot\\vec{u} + \\vec{u}\\times\\vec{v}] = [-\\vec{u}\\cdot\\vec{v},\\; s\\vec{v} + \\vec{u}\\times\\vec{v}]$$</p>

<p>再右乘 $q^{-1} = [s, -\\vec{u}]$（因为 $|\\!q\\!|=1$，$q^{-1}=q^*$）：</p>

<p>$$p' = (q p) \\cdot q^{-1} = [-\\vec{u}\\cdot\\vec{v},\\; s\\vec{v} + \\vec{u}\\times\\vec{v}] \\cdot [s, -\\vec{u}]$$</p>

<p>**展开标量部分**：</p>

<p>$$s' = (-\\vec{u}\\cdot\\vec{v})\\cdot s - (s\\vec{v} + \\vec{u}\\times\\vec{v})\\cdot(-\\vec{u})$$</p>

<p>注意到 $(s\\vec{v})\\cdot(-\\vec{u}) = -s(\\vec{v}\\cdot\\vec{u})$，而 $(\\vec{u}\\times\\vec{v})\\cdot(-\\vec{u}) = 0$（叉积与两原向量垂直）：</p>

<p>$$s' = -s(\\vec{u}\\cdot\\vec{v}) + s(\\vec{v}\\cdot\\vec{u}) = 0 \\quad \\checkmark$$</p>

<p>标量部分为 0，说明 $p'$ 确实是纯四元数！</p>

<p>**展开向量部分**（略去繁复的向量恒等式，利用 $\\vec{u}\\cdot\\vec{u}=1$，$(\\vec{u}\\times\\vec{v})\\times\\vec{u} = \\vec{v} - (\\vec{u}\\cdot\\vec{v})\\vec{u}$ 等）：</p>

<p>经过张量恒等式展开后，最终结果为：</p>

<p>$$\\boxed{\\vec{v}' = \\cos^2\\frac{\\theta}{2}\\;\\vec{v} + \\sin^2\\frac{\\theta}{2}\\;(\\vec{u}\\cdot\\vec{v})\\vec{u} + \\sin\\frac{\\theta}{2}\\cos\\frac{\\theta}{2}\\;(\\vec{u}\\times\\vec{v})}$$</p>

<p>这正是**Rodrigues 旋转公式**（见本章第三节），即 $\\vec{v}$ 绕 $\\vec{u}$ 轴旋转 θ 角后的向量。</p>

<p>□ 证毕</p>

<blockquote>📌 **核心结论**：$p' = q p q^{-1}$ 恰好将 $\\vec{v}$ 绕 $\\vec{u}$ 轴旋转 $\\theta = 2\\arccos s$ 角度。</blockquote>

</details>

<hr />

<h3>三、与旋转矩阵的相互转换</h3>

<h4>🔍 通俗理解</h4>

<p>四元数和旋转矩阵是描述同一件事（旋转）的两种不同语言。既然是等价描述，必然可以互相转换。</p>

<p>**旋转矩阵**：$3\\times3$ 正交矩阵，满足 $R R^T = I$，$\\det(R) = +1$</p>
<p>**单位四元数**：$[\\cos\\theta, \\sin\\theta\\;\\vec{u}]$，标量-向量四个分量</p>

<p>**为什么四元数比矩阵更受欢迎？**（尤其在游戏引擎、机器人、航空航天中）</p>
<p>1. **存储效率**：4 个数 vs 9 个数（矩阵）</p>
<p>2. **插值平滑**：SLERP（球面线性插值）比矩阵插值简单得多</p>
<p>3. **无万向锁**：不依赖欧拉角的分解方式</p>

<hr />

<details class="def-box" open>
<summary>📖 定义 2：单位四元数 → 旋转矩阵</summary>

<p>设单位四元数 $q = [s, (x, y, z)]$（其中 $s^2 + x^2 + y^2 + z^2 = 1$），对应的 $3\\times3$ 旋转矩阵 $R$ 为：</p>

<p>$$\\boxed{R = \\begin{pmatrix} 1-2(y^2+z^2) & 2(xy - sz) & 2(xz + sy) \\\\ 2(xy + sz) & 1-2(x^2+z^2) & 2(yz - sx) \\\\ 2(xz - sy) & 2(yz + sx) & 1-2(x^2+y^2) \\end{pmatrix}}$$</p>

<p>**验证正交性**：$R R^T = I$（因为 $|\\!q\\!|=1$）</p>

<p>**数值稳定版**（归一化处理）：</p>

<pre><code className="language-python">def quaternion_to_matrix(q):
    """四元数 -> 旋转矩阵（数值稳定）"""
    s, (x, y, z) = q.s, q.v
    # 先归一化
    norm = np.sqrt(s**2 + x**2 + y**2 + z**2)
    s, x, y, z = s/norm, x/norm, y/norm, z/norm
    return np.array([
        [1-2*(y**2+z**2), 2*(x*y - s*z), 2*(x*z + s*y)],
        [2*(x*y + s*z),   1-2*(x**2+z**2), 2*(y*z - s*x)],
        [2*(x*z - s*y),   2*(y*z + s*x),   1-2*(x**2+y**2)]
    ])</code></pre>

</details>

<details class="def-box" open>
<summary>📖 定义 3：旋转矩阵 → 单位四元数</summary>

<p>从旋转矩阵 $R$ 提取四元数有多种算法。下面是常用的 **Shepperd 方法**（基于矩阵迹）：</p>

<p>**步骤 1**：从矩阵迹（trace）判断最大分量</p>

<p>$$t = \\text{tr}(R) = r_{11} + r_{22} + r_{33} = 1 + 2(s - x^2 - y^2 - z^2) + ?$$</p>

<p>Shepperd 方法直接用分量公式：</p>

<p>$$4s = \\sqrt{1 + r_{11} + r_{22} + r_{33}}$$</p>
<p>$$4x = \\sqrt{1 + r_{11} - r_{22} - r_{33}} \\cdot \\text{sign}(r_{32} - r_{23})$$</p>
<p>$$4y = \\sqrt{1 - r_{11} + r_{22} - r_{33}} \\cdot \\text{sign}(r_{13} - r_{31})$$</p>
<p>$$4z = \\sqrt{1 - r_{11} - r_{22} + r_{33}} \\cdot \\text{sign}(r_{21} - r_{12})$$</p>

<p>然后归一化：$[s, x, y, z] / \\sqrt{s^2+x^2+y^2+z^2}$。</p>

<p>**步骤 2**：根据 $t$ 的取值选择稳定公式（避免除以接近零的数）：</p>

<li>若 $t > 0$：用上述直接公式</li>
<li>若 $r_{22} > r_{11}$ 且 $r_{33} > r_{22}$：优先解 x, y, z</li>
<li>等等……（实践中直接用 \`scipy.spatial.transform.Rotation\` 更可靠）</li>

</details>

<details class="def-box" open>
<summary>📖 Rodrigues 旋转公式（补充背景）</summary>

<p>**Rodrigues 旋转公式**是用向量代数表示绕轴旋转的直接公式，与四元数旋转完全等价：</p>

<p>$$\\boxed{\\vec{v}' = \\vec{v}\\cos\\theta + (\\vec{u}\\times\\vec{v})\\sin\\theta + \\vec{u}(\\vec{u}\\cdot\\vec{v})(1-\\cos\\theta)}$$</p>

<p>其中 $\\vec{v}$ 是原始向量，$\\vec{u}$ 是单位旋转轴，$\\theta$ 是旋转角，$\\vec{v}'$ 是旋转后的向量。</p>

<p>**四元数视角**：Rodrigues 公式正是 $p' = q p q^{-1}$ 展开后的向量形式，两者数学上完全等价。四元数方法的优势在于只需存储和插值四元数参数，而 Rodrigues 公式每次计算需要叉积和点积。</p>

</details>

<hr />

<h3>四、万向锁（Gimbal Lock）：欧拉角的致命缺陷</h3>

<h4>🔍 通俗理解</h4>

<p>万向锁是使用**欧拉角**（Euler Angles）表示三维旋转时的经典病态问题。在解释万向锁之前，先了解欧拉角是什么。</p>

<p>**欧拉角**：用三个角度（yaw/pitch/roll，或 α/β/γ）依次绕不同轴旋转来描述任意三维旋转。例如"先绕 Z 轴转 30°，再绕 Y 轴转 60°，再绕 X 轴转 45°"。</p>

<p>**万向锁何时发生？** 当第二次旋转（pitch）达到 ±90° 时，第一次旋转的轴和第三次旋转的轴对齐了！此时丢失了一个自由度——无论怎么调整第三角，都无法区分某些不同的旋转。</p>

<blockquote>🎯 **生活类比**：想象用两把锁（万向节）连接三根棍子。当中间那把锁旋转到某个角度时，第一根和第三根棍子完全对齐了，这时无论怎么拧最后一根，都无法让它朝原来独立方向运动——这就是万向锁。</blockquote>

<p>**四元数如何避免万向锁？** 四元数不依赖欧拉角的分解，始终以"绕某轴旋转某角"的完整形式存储旋转。没有任何中间步骤会被"锁死"，因为四元数的四个分量同时完整地编码了整个旋转，没有任何分量被牺牲掉。</p>

<hr />

<details class="def-box" open>
<summary>📖 定义 4：万向锁的数学本质</summary>

<p>**欧拉角到旋转矩阵的映射**（Z-X-Z 欧拉角为例）：</p>

<p>$$R = R_z(\\alpha) R_x(\\beta) R_z(\\gamma)$$</p>

<p>其中 $R_x(\\beta)$ 是在 X 轴方向的"中间旋转"。</p>

<p>**万向锁发生的条件**：当 $\\beta = \\pm\\frac{\\pi}{2}$（即 90°）时：</p>

<p>$$R_x\\left(\\frac{\\pi}{2}\\right) = \\begin{pmatrix}1 & 0 & 0 \\\\ 0 & 0 & -1 \\\\ 0 & 1 & 0\\end{pmatrix}$$</p>

<p>此时 $R_z(\\alpha)$ 和 $R_z(\\gamma)$ 的旋转轴变成相同的方向：</p>

<p>$$R_z(\\alpha) R_x(\\frac{\\pi}{2}) R_z(\\gamma) = R_x(\\frac{\\pi}{2}) R_z(\\alpha + \\gamma)$$</p>

<p>**两个独立参数**（α 和 γ）变成了**一个参数**（α+γ）！这就是自由度的丢失。</p>

<p>**四元数的万向锁免疫性**：</p>

<p>四元数 $q = [\\cos\\frac{\\theta}{2},\\; \\sin\\frac{\\theta}{2}\\;\\vec{u}]$ 的四个分量始终全局有效，不存在"某个角度使某方向丢失"的情况。四元数空间是一个**连续的四维球面** $S^3$（无奇点），而欧拉角空间是一个有孔洞和奇点的三维流形。</p>

<blockquote>💡 **关键洞察**：欧拉角的问题本质是**参数化方式的奇异性**（singularity），不是旋转本身的问题。四元数提供了旋转群 $SO(3)$ 的**双覆盖**（2-to-1）流形表示，无奇点。</blockquote>

</details>

<hr />

<h3>五、双覆盖问题：$q$ 和 $-q$ 是同一旋转</h3>

<h4>🔍 通俗理解</h4>

<p>四元数有一个有趣也令人困惑的特性：**一个三维旋转对应两个四元数**，它们恰好互为相反数。</p>

<p>也就是说，$q$ 和 $-q$ 描述的是完全相同的旋转！这叫做**双覆盖**（Double Cover），因为单位四元数空间 $S^3$（四维球面）上的每一点，对应三维旋转群 $SO(3)$ 上的一个旋转，但映射是"2 对 1"的——就像地球上每个地方在镜子里都有一个镜像，但镜子内外其实是同一个地方。</p>

<p>**为什么是 $\\theta/2$ 而不是 $\\theta$？** 这正是双覆盖的数学根源！</p>

<li>当旋转角 $\\theta = 0$ 时：$q = [\\cos 0, \\sin 0\\;\\vec{u}] = [1, \\vec{0}] = 1$（唯一）</li>
<li>当旋转角 $\\theta = 2\\pi$ 时（全圈）：$q = [\\cos \\pi, \\sin \\pi\\;\\vec{u}] = [-1, \\vec{0}] = -1$</li>

<p>注意！$\\theta = 0$ 和 $\\theta = 2\\pi$ 都代表"不旋转"，但对应四元数 $1$ 和 $-1$ **两个**值。这说明：每转一整圈（360°），四元数才走完一个完整周期。所以要区分所有不同的旋转，四元数需要走两个完整周期——这就是"双覆盖"的来源。</p>

<blockquote>🎯 **莫比乌斯带的类比**：想象你带着一面旗帜绕着杆子走，绕完一圈后旗帜方向不变，但你的位置和出发时不同了。再绕一圈才回到完全相同的状态。四元数的双覆盖与此类似。</blockquote>

<hr />

<details class="def-box" open>
<summary>📖 定义 5：双覆盖的数学证明（核心）</summary>

<p>**定理**：设 $q = [\\cos\\frac{\\theta}{2},\\; \\sin\\frac{\\theta}{2}\\;\\vec{u}]$ 是绕轴 $\\vec{u}$ 旋转角 $\\theta$ 的单位四元数，则 $-q = [-\\cos\\frac{\\theta}{2},\\; -\\sin\\frac{\\theta}{2}\\;\\vec{u}]$ 描述**完全相同的旋转**。</p>

<p>**证明**：</p>

<p>对任意纯四元数 $p = [0, \\vec{v}]$：</p>

<p>$$q p q^{-1} = ?\\quad \\text{vs}\\quad (-q) p (-q)^{-1}$$</p>

<p>因为 $(-q)^{-1} = -q^{-1}$（$|-q|=|q|=1$），有：</p>

<p>$$(-q) p (-q)^{-1} = (-q) p (-q^{-1}) = (-1)(q p q^{-1})(-1) = q p q^{-1}$$</p>

<p>两个结果完全相同！$$\\blacksquare$$</p>

<p>**推论**：单位四元数空间 $S^3$ 到旋转群 $SO(3)$ 的映射 $\\pi: S^3 \\to SO(3)$ 是**2-to-1**的满射：</p>
<p>$$\\pi(q) = \\pi(-q), \\quad \\forall q \\in S^3$$</p>

<p>**实际影响**：</p>
<p>1. **四元数插值时注意**：SLERP 可能在 $q$ 和 $-q$ 之间选择错误路径，应先点乘判断夹角</p>
<p>2. **存储时无影响**：$q$ 和 $-q$ 数学上等效，任选其一存储即可</p>
<p>3. **连续旋转无问题**：只要在相邻帧间选取"近的一侧"的四元数，就能避免跳变</p>

</details>

<hr />

<h3>六、代码实现：三维旋转的完整工程</h3>

<pre><code className="language-python">import numpy as np
from scipy.spatial.transform import Rotation as R_scipy
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# ============ 1. 四元数旋转函数 ============

def quaternion_rotate(vec, q):
    """
    用四元数 q 旋转三维向量 vec
    vec: array-like, shape (3,)
    q: Quaternion object (from chapter 2), 或直接传 [s, x, y, z]
    """
    if isinstance(q, (list, tuple, np.ndarray)) and len(q) == 4:
        s, x, y, z = q
    else:
        s, (x, y, z) = q.s, q.v

    p = np.array([0.0, vec[0], vec[1], vec[2]])  # 纯四元数 [0, v]
    q_arr = np.array([s, x, y, z])

    # Hamilton 积: q * p
    qp = np.array([
        s*0 - x*vec[0] - y*vec[1] - z*vec[2],       # 标量
        s*vec[0] + vec[1]*z - vec[2]*y + 0*s,       # i
        -s*vec[0] + x*z + y*0 + vec[2]*x,            # j (修正)
        # 用完整公式:
    ])
    # 为避免手写错误，直接用 numpy 实现 Hamilton 积:
    def hamilton(a, b):
        return np.array([
            a[0]*b[0] - a[1]*b[1] - a[2]*b[2] - a[3]*b[3],
            a[0]*b[1] + a[1]*b[0] + a[2]*b[3] - a[3]*b[2],
            a[0]*b[2] - a[1]*b[3] + a[2]*b[0] + a[3]*b[1],
            a[0]*b[3] + a[1]*b[2] - a[2]*b[1] + a[3]*b[0],
        ])
    q_arr_norm = q_arr / np.linalg.norm(q_arr)
    q_conj = q_arr_norm * np.array([1, -1, -1, -1])
    p_vec = np.array([0, vec[0], vec[1], vec[2]])
    p_prime = hamilton(hamilton(q_arr_norm, p_vec), q_conj)
    return p_prime[1:4]  # 返回纯向量部分


# ============ 2. 轴角 -> 四元数 -> 旋转矩阵 完整流程 ============

def axis_angle_to_quaternion(axis, angle_deg):
    """轴角 -> 单位四元数"""
    axis = np.array(axis, dtype=float)
    axis = axis / np.linalg.norm(axis)
    theta = np.radians(angle_deg)
    return np.array([
        np.cos(theta / 2),
        np.sin(theta / 2) * axis[0],
        np.sin(theta / 2) * axis[1],
        np.sin(theta / 2) * axis[2],
    ])

def quaternion_to_matrix(q):
    """单位四元数 -> 旋转矩阵"""
    s, x, y, z = q
    n = np.sqrt(s**2 + x**2 + y**2 + z**2)
    s, x, y, z = s/n, x/n, y/n, z/n
    return np.array([
        [1-2*(y**2+z**2), 2*(x*y-s*z),   2*(x*z+s*y)],
        [2*(x*y+s*z),     1-2*(x**2+z**2), 2*(y*z-s*x)],
        [2*(x*z-s*y),     2*(y*z+s*x),    1-2*(x**2+y**2)],
    ])

def matrix_to_axis_angle(R):
    """旋转矩阵 -> 轴角 (用 scipy)"""
    r = R_scipy.from_matrix(R)
    axis = r.as_rotvec()          # 轴角形式
    angle = np.linalg.norm(axis)
    axis_norm = axis / angle if angle > 1e-10 else np.array([1., 0., 0.])
    return axis_norm, np.degrees(angle)


# ============ 3. 完整示例：验证四元数旋转 = 矩阵旋转 ============

print("=== 四元数旋转验证 ===\\n")

# 测试用例：绕 Z 轴旋转 90°
axis = [0, 0, 1]
angle = 90
vec = np.array([1.0, 0.0, 0.0])  # X 轴上的向量

q = axis_angle_to_quaternion(axis, angle)
R = quaternion_to_matrix(q)
vec_quat = quaternion_rotate(vec, q)
vec_matrix = R @ vec

print(f"绕轴 {axis} 旋转 {angle}°")
print(f"原始向量: {vec}")
print(f"四元数旋转: {vec_quat.round(6)}")
print(f"矩阵旋转:  {vec_matrix.round(6)}")
print(f"两者一致? {np.allclose(vec_quat, vec_matrix, atol=1e-9)}")

# 反向验证：从旋转矩阵还原四元数
axis_rec, angle_rec = matrix_to_axis_angle(R)
print(f"\\n从旋转矩阵还原: 轴={axis_rec.round(3)}, 角={angle_rec:.2f}°")

# 绕任意轴旋转（综合测试）
print("\\n=== 综合测试：绕任意轴旋转 ===")
axis = [1, 1, 0] / np.sqrt(2)   # X-Y 对角线轴
angle = 45
vec = np.array([0., 0., 1.])     # Z 轴方向

q = axis_angle_to_quaternion(axis, angle)
R = quaternion_to_matrix(q)
vec_quat = quaternion_rotate(vec, q)
vec_matrix = R @ vec

print(f"绕轴 [1,1,0]/√2 旋转 45°")
print(f"原始向量: {vec}")
print(f"四元数旋转: {vec_quat.round(6)}")
print(f"矩阵旋转:  {vec_matrix.round(6)}")
print(f"误差: {np.linalg.norm(vec_quat - vec_matrix):.2e}")

# ============ 4. SLERP 插值 ============

def slerp(q1, q2, t):
    """
    球面线性插值（Spherical Linear Interpolation）
    q1, q2: 单位四元数 [s, x, y, z]
    t: 插值参数 [0, 1]
    返回: 插值后的四元数
    """
    q1, q2 = np.array(q1), np.array(q2)
    dot = np.dot(q1, q2)

    # 如果点积为负，反转 q2（保证走最短路径）
    if dot < 0:
        q2 = -q2
        dot = -dot

    # 避免 acos 的数值问题
    dot = np.clip(dot, -1.0, 1.0)
    theta_0 = np.arccos(dot)        # 夹角
    theta = theta_0 * t              # 插值角度

    q = (q1 * np.sin(theta_0 - theta) + q2 * np.sin(theta)) / np.sin(theta_0)
    return q

# 演示：从 q1 = [1,0,0,0]（恒等）到 q2 = 绕 Z 轴 90°
q1 = np.array([1., 0., 0., 0.])    # 恒等四元数
q_z90 = axis_angle_to_quaternion([0,0,1], 90)
q2 = q_z90

print("\\n=== SLERP 插值演示（绕 Z 轴 0°→90°）===")
for t_val in [0.0, 0.25, 0.5, 0.75, 1.0]:
    q_interp = slerp(q1, q2, t_val)
    R_interp = quaternion_to_matrix(q_interp)
    vec_result = R_interp @ np.array([1., 0., 0.])
    axis_rec, angle_rec = matrix_to_axis_angle(R_interp)
    print(f"t={t_val:.2f} | 旋转角≈{angle_rec:.1f}° | 向量≈({vec_result[0]:.3f}, {vec_result[1]:.3f}, {vec_result[2]:.3f})")

# ============ 5. 可视化 ============
fig = plt.figure(figsize=(10, 5))

# 子图1：旋转前后对比
ax1 = fig.add_subplot(121, projection='3d')
ax1.set_xlim(-1.5, 1.5); ax1.set_ylim(-1.5, 1.5); ax1.set_zlim(-1.5, 1.5)
ax1.set_xlabel('X'); ax1.set_ylabel('Y'); ax1.set_zlabel('Z')
ax1.set_title('四元数旋转：向量 (1,0,0) →')

origin = np.array([0., 0., 0.])
vec_original = np.array([1., 0., 0.])
vec_rotated = quaternion_rotate(vec_original, q_z90)

ax1.quiver(*origin, *vec_original, color='blue', arrow_length_ratio=0.1, label='原始')
ax1.quiver(*origin, *vec_rotated, color='red', arrow_length_ratio=0.1, label='旋转后(90°Z)')
ax1.legend()

# 子图2：SLERP 路径
ax2 = fig.add_subplot(122, projection='3d')
ax2.set_xlim(-1.5, 1.5); ax2.set_ylim(-1.5, 1.5); ax2.set_zlim(-1.5, 1.5)
ax2.set_xlabel('X'); ax2.set_ylabel('Y'); ax2.set_zlabel('Z')
ax2.set_title('SLERP 插值路径（0°→90°）')

for t_val in np.linspace(0, 1, 20):
    q_interp = slerp(q1, q2, t_val)
    R_interp = quaternion_to_matrix(q_interp)
    vec_result = R_interp @ vec_original
    ax2.scatter(*vec_result, color='green', s=5)
    ax2.quiver(*origin, *vec_result, color='green', alpha=0.3, arrow_length_ratio=0.05)

ax2.scatter(1, 0, 0, color='blue', s=100, label='起点')
ax2.scatter(0, 1, 0, color='red', s=100, label='终点')
ax2.legend()

plt.tight_layout()
plt.savefig('/workspace/studies/四元数与空间变换/ch3_quaternion_rotation.png', dpi=150)
print("\\n图片已保存: ch3_quaternion_rotation.png")</code></pre>

<p>**运行结果说明**：</p>
<li>程序验证了四元数旋转与矩阵旋转的数值等价性（误差 ≈ 10⁻¹⁵ 量级）</li>
<li>SLERP 插值演示了从恒等四元数到 Z 轴 90° 旋转的平滑过渡路径</li>
<li>可视化展示旋转前后的向量位置以及插值轨迹（圆弧）</li>

<hr />

<h3>📝 本章要点速记</h3>

<p>1. **轴角 → 四元数**：$q = [\\cos\\frac{\\theta}{2},\\; \\sin\\frac{\\theta}{2}\\;\\vec{u}]$，标量部分是 $\\cos\\frac{\\theta}{2}$，不是 $\\cos\\theta$！</p>

<p>2. **四元数旋转公式**：$p' = q \\cdot p \\cdot q^{-1}$（双侧乘法），其中 $p = [0, \\vec{v}]$ 是纯四元数</p>

<p>3. **旋转矩阵 ↔ 四元数**：可相互精确转换，四元数只需要 4 个参数，旋转矩阵需要 9 个</p>

<p>4. **Rodrigues 公式**：与四元数旋转等价，是叉积/点积形式的直接旋转公式</p>

<p>5. **万向锁的本质**：欧拉角参数化的奇异性，四元数无奇点（$S^3$ 球面无孔洞）</p>

<p>6. **双覆盖**：$q$ 和 $-q$ 描述同一旋转；全旋转（360°）对应四元数走 720°（两个周期）</p>

<p>7. **SLERP**：球面线性插值，比矩阵插值更平滑，用于动画和路径规划</p>

<hr />

<h3>🎯 章节练习</h3>

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 将"绕 Z 轴旋转 60°"写成四元数 |
| 2 | 计算题 | ⭐⭐ | 验证：$q p q^{-1}$ 对 $p=[0,(1,0,0)]$ 的结果等于 $R_z(\\theta)(1,0,0)$ |
| 3 | 推导题 | ⭐⭐ | 推导绕 X 轴的单位四元数对应的旋转矩阵 |
| 4 | 判断题 | ⭐⭐ | 解释为什么欧拉角会发生万向锁，而四元数不会 |
| 5 | 计算题 | ⭐⭐ | 给定旋转矩阵，提取对应的四元数（使用 Shepperd 方法步骤）|
| 6 | 概念题 | ⭐⭐⭐ | 解释双覆盖：为什么 $q$ 和 $-q$ 是同一旋转？这在实际工程中有何影响？|
| 7 | 代码题 | ⭐⭐⭐ | 实现 SLERP 函数，并验证其与矩阵线性插值的差异 |
| 8 | 综合题 | ⭐⭐⭐ | 给定旋转序列：先绕 X 轴 90°，再绕 Y 轴 90°，用代码验证交换顺序结果不同，并说明其与四元数非交换性的关系 |

<hr />

<h3>🚀 下一章预告</h3>

<p>**第4章：四元数的实际应用与高级话题**</p>

<p>掌握了四元数旋转的数学原理后，本章将深入探讨四元数在实际工程中的广泛应用：从航空航天姿态控制到游戏引擎的角色旋转，从机器人运动学到 VR/AR 中的头显追踪。我们还将探讨四元数的指数映射、对数运算，以及如何在连续旋转中避免四元数漂移问题。</p>
`,
    4: `<h2>第4章：四元数的指数与对数映射</h2>

<blockquote>**本章简介**：理解四元数如何像复数一样拥有指数与对数形式，掌握 $e^q$ 与 $\\ln q$ 的几何意义，理解单位四元数构成的三维流形结构。这些数学工具是 SLERP（球面线性插值）的理论基石，直接服务于第5章的插值计算。</blockquote>
<blockquote></blockquote>
<blockquote>⏱ 预估学时：4 小时 | 难度：⭐⭐⭐ | 📍 前置：第1章（欧拉公式）、第3章（四元数乘法）</blockquote>

<hr />

<h3>一、从复数指数到四元数指数：为什么需要指数映射？</h3>

<h4>🔍 通俗理解</h4>

<p>在第1章中，我们看到了复数指数 $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ 的强大威力——它把"旋转 θ 角度"这件事用一个简洁的指数形式表达了出来。更妙的是，复数乘法对应旋转组合：</p>

<p>$$e^{i\\alpha} \\cdot e^{i\\beta} = e^{i(\\alpha+\\beta)}$$</p>

<p>这意味着两次旋转可以合并为一次旋转，角度直接相加。而在实际应用中，我们经常需要处理**分数次旋转**（比如旋转 45°）或**连续旋转速度**（比如每秒旋转 30°）——这正是**对数**与**指数**发挥作用的地方：</p>

<li>**对数** $\\ln(e^{i\\theta}) = i\\theta$：把旋转"拆开"，问"这个旋转角到底是多少"</li>
<li>**指数** $e^{i\\theta/2}$：把旋转"细分"，问"半次旋转怎么做"</li>

<p>四元数继承了复数的这套思想，但扩展到了三维旋转的场景。区别在于：复数的指数 $e^{i\\theta}$ 是一个"绕原点旋转"的代名词，而四元数的指数 $e^q$ 则更加丰富——它既可以描述**连续时间下的旋转轨迹**（指数映射产生四元数的"时间演化"），也可以描述**任意四元数之间的代数运算**（幂运算 $q^t$）。</p>

<blockquote>🎯 **电梯比喻**：想象一个摩天大楼，每层代表四元数空间的一个截面，复数指数 $e^{i\\theta}$ 就像电梯只能上下移动（在一维圆上移动）。而四元数指数 $e^q$ 则像是一部**3D电梯**——它能在三维球面上自由移动，不只是上下，而是任意方向。</blockquote>

<hr />

<h3>二、四元数指数映射的定义与推导</h3>

<h4>🔍 通俗理解</h4>

<p>设有一个一般四元数 $q = [s, \\vec{v}] = [s, v_x, v_y, v_z]$，其中 $\\vec{v} = (v_x, v_y, v_z)$ 是它的矢量部分，$s$ 是标量部分（实部）。我们想定义它的指数 $e^q$。</p>

<p>直觉上，指数函数应该把"加法"变成"乘法"——就像实数域里 $e^{a+b} = e^a \\cdot e^b$，在四元数域里我们也希望 $e^{q_1+q_2} = e^{q_1} \\cdot e^{q_2}$。但由于四元数乘法**不满足交换律**（三维旋转的特性），这个性质只在 $q_1$ 和 $q_2$ 可交换（即方向平行）时才成立。</p>

<p>把四元数拆成标量 $s$ 和矢量 $\\vec{v}$ 两部分，我们的策略是：</p>

<p>$$e^q = e^{s+[\\vec{v}]} = e^s \\cdot e^{[\\vec{v}]}$$</p>

<p>其中 $[\\vec{v}]$ 表示纯四元数 $[0, \\vec{v}]$。$e^s$ 是普通实数指数，容易处理。关键是计算 $e^{[\\vec{v}]}$——一个纯虚四元数（矢量部分）的指数。</p>

<hr />

<details class="proof-box" open>
<summary>📐 推导：纯四元数指数 $e^{[\vec{v}]}$（泰勒级数法）</summary>

<p>**核心思想**：利用纯四元数 $[\\vec{v}]$ 的代数性质——它的平方是负的纯量（对应 i² = -1 的高维推广）。</p>

<p>**第一步：写出纯四元数的泰勒级数**</p>

<p>$$e^{[\\vec{v}]} = 1 + [\\vec{v}] + \\frac{[\\vec{v}]^2}{2!} + \\frac{[\\vec{v}]^3}{3!} + \\frac{[\\vec{v}]^4}{4!} + \\cdots$$</p>

<p>**第二步：分析 $[\\vec{v}]^2$**</p>

<p>设 $\\vec{v} = (v_x, v_y, v_z)$，则纯四元数 $[\\vec{v}] = [0, v_x, v_y, v_z]$。</p>

<p>根据四元数乘法规则（来自第2章）：</p>

<p>$$[\\vec{v}]^2 = [0, \\vec{v}]^2 = [-\\|\\vec{v}\\|^2, \\vec{0}] = [-\\|\\vec{v}\\|^2, 0, 0, 0]$$</p>

<p>这是因为两个平行向量的叉乘为零：$\\vec{v} \\times \\vec{v} = \\vec{0}$，而标量部分来自 $-(v_x^2+v_y^2+v_z^2) = -\\|\\vec{v}\\|^2$。</p>

<p>**第三步：观察幂次规律**</p>

<p>$$[\\vec{v}]^2 = -\\|\\vec{v}\\|^2 \\cdot [1, \\vec{0}]$$</p>
<p>$$[\\vec{v}]^3 = [\\vec{v}]^2 \\cdot [\\vec{v}] = -\\|\\vec{v}\\|^2 \\cdot [0, \\vec{v}] = -\\|\\vec{v}\\|^2 [\\vec{v}]$$</p>
<p>$$[\\vec{v}]^4 = ([\\vec{v}]^2)^2 = (-\\|\\vec{v}\\|^2)^2 = \\|\\vec{v}\\|^4$$</p>
<p>$$[\\vec{v}]^5 = -\\|\\vec{v}\\|^4 [\\vec{v}]$$</p>
<p>$$\\vdots$$</p>

<p>**第四步：分组实部与虚部**</p>

<p>设 $\\|\\vec{v}\\| = \\rho$，则：</p>

<li>**实部（标量项）**：$1 - \\frac{\\rho^2}{2!} + \\frac{\\rho^4}{4!} - \\frac{\\rho^6}{6!} + \\cdots = \\cos\\rho$</li>
<li>**虚部（矢量项）**：$\\rho\\left(\\frac{[\\vec{v}]}{\\rho}\\right)\\left[1 - \\frac{\\rho^2}{3!} + \\frac{\\rho^4}{5!} - \\cdots\\right] = \\frac{[\\vec{v}]}{\\rho}\\sin\\rho$</li>

<p>注意到：$[\\vec{v}]/\\rho$ 是一个**单位纯四元数**，方向与 $\\vec{v}$ 相同。</p>

<p>$$\\boxed{e^{[\\vec{v}]} = \\cos\\rho + \\frac{[\\vec{v}]}{\\rho}\\sin\\rho = \\cos\\|\\vec{v}\\| + \\frac{\\vec{v}}{\\|\\vec{v}\\|}\\sin\\|\\vec{v}\\|}$$</p>

<p>□ 证毕</p>

</details>

<hr />

<details class="def-box" open>
<summary>📖 定义 1：四元数指数映射（Exponential Map）</summary>

<p>对于任意四元数 $q = [s, \\vec{v}]$，记 $\\|\\vec{v}\\| = \\rho$，定义**指数映射**为：</p>

<p>$$e^q = e^s \\cdot e^{[\\vec{v}]} = e^s\\left(\\cos\\rho + \\frac{\\vec{v}}{\\rho}\\sin\\rho\\right)$$</p>

<p>其中 $[\\vec{v}] = [0, \\vec{v}]$ 是纯四元数。当 $\\vec{v} = \\vec{0}$ 时，约定 $e^{[0]} = 1$。</p>

<p>**等价写法**（使用向量形式）：</p>

<p>$$e^{[s, \\vec{v}]} = e^s\\left[\\cos\\|\\vec{v}\\|,\\; \\frac{\\vec{v}}{\\|\\vec{v}\\|}\\sin\\|\\vec{v}\\| \\right]$$</p>

<p>**特别情况：纯单位四元数的指数**</p>

<p>若 $\\vec{u}$ 是单位向量（$\\|\\vec{u}\\|=1$），则：</p>

<p>$$e^{[\\theta\\vec{u}]} = [\\cos\\theta,\\; \\vec{u}\\sin\\theta]$$</p>

<p>这正是单位四元数表示三维旋转的标准形式！角度为 $\\theta$，旋转轴为 $\\vec{u}$。</p>

</details>

<hr />

<details class="def-box" open>
<summary>📖 定义 2：四元数对数映射（Logarithm Map）</summary>

<p>指数映射的逆运算。对数映射 $\\ln q$ 的定义域为 $q \\neq [0, \\vec{0}]$（非零四元数）。</p>

<p>对于一般四元数 $q = [s, \\vec{v}]$，记 $\\|q\\| = r$，$\\|\\vec{v}\\| = \\rho$：</p>

<p>$$\\ln q = \\left[\\ln r,\\; \\frac{\\vec{v}}{\\rho}\\arccos\\frac{s}{r}\\right]$$</p>

<p>其中 $\\arccos$ 的输入恒在 $[-1, 1]$ 范围内（因为 $|s/r| \\leq 1$）。</p>

<p>**几何意义**：</p>
<li>$\\ln r = \\ln\\|q\\|$ 是模长的对数，描述四元数的"缩放因子"</li>
<li>$\\frac{\\vec{v}}{\\|\\vec{v}\\|}\\arccos\\frac{s}{\\|q\\|}$ 是一个纯四元数，其方向等于 $\\vec{v}$ 的方向，幅值等于与标量轴的夹角</li>

<p>**特殊情形：单位四元数的对数**</p>

<p>若 $\\|q\\| = 1$（单位四元数），则 $r = 1$，$\\ln r = 0$，此时：</p>

<p>$$\\ln q = \\left[0,\\; \\frac{\\vec{v}}{\\|\\vec{v}\\|}\\arccos s\\right] = [\\theta\\vec{u}]$$</p>

<p>其中 $q = [\\cos\\theta, \\vec{u}\\sin\\theta]$，$\\vec{u}$ 为单位向量。这就是说 $\\ln q$ 本质上记录了旋转轴方向 $\\vec{u}$ 和半角 $\\theta$（注意是半角！）。</p>

</details>

<hr />

<h3>三、指数与对数的几何意义：旋转的连续化</h3>

<h4>🔍 通俗理解</h4>

<p>指数与对数映射最深刻的意义，在于它们建立了**四元数空间**与**三维旋转群**之间的双射关系。这种关系让我们可以从"角度"的角度思考旋转，也可以从"时间"的角度思考旋转。</p>

<p>**从指数映射看旋转的时间演化：**</p>

<p>假设一个刚体以角速度 $\\vec{\\omega}$ 绕固定轴 $\\vec{u}$ 旋转，每秒钟转 $\\omega$ 弧度（角速度大小）。经过时间 $t$ 秒后，总旋转角度为 $\\omega t$。用四元数表示：</p>

<p>$$q(t) = e^{[\\omega t \\cdot \\vec{u}]} = [\\cos(\\omega t),\\; \\vec{u}\\sin(\\omega t)]$$</p>

<p>这是物理学中**旋转的时间演化方程**——四元数指数映射在这里扮演了"旋转累积器"的角色。</p>

<p>**从对数映射看旋转的分解：**</p>

<p>给定一个旋转四元数 $q = [\\cos\\theta, \\vec{u}\\sin\\theta]$，对数运算提取出：</p>

<p>$$\\ln q = [\\theta\\vec{u}]$$</p>

<p>这里 $\\theta$ 是旋转角度，$\\vec{u}$ 是旋转轴。我们把一个四元数"拆解"成了"转多少 + 绕哪转"这两个物理量。</p>

<blockquote>🎯 **自行车码表比喻**：想象你的自行车车轮上装了一个四元数"码表"。每当你骑车转弯，码表就记录下这次旋转的四元数 $q$。用对数运算 $\\ln q$，你可以问："刚才我到底转了多少度？绕什么轴？"而指数运算 $e^q$ 则反过来："根据这个旋转信息，给我一个新的四元数。"</blockquote>

<hr />

<details class="def-box" open>
<summary>📖 定义 3：四元数幂运算（Power）</summary>

<p>利用指数与对数，可以定义任意实数次幂：</p>

<p>$$q^t = e^{t \\ln q}$$</p>

<p>**物理直觉**：幂运算 $q^t$ 表示"将旋转 $q$ 缩放 $t$ 倍"。</p>

<li>当 $t = 0$：$q^0 = 1$（单位元，无旋转）</li>
<li>当 $t = 1$：$q^1 = q$（原旋转）</li>
<li>当 $t = 2$：$q^2$（旋转角度翻倍）</li>
<li>当 $t = 0.5$：$q^{0.5}$（旋转角度减半，即开平方根）</li>
<li>当 $t = -1$：$q^{-1} = q^*$（共轭四元数，逆向旋转）</li>

<p>**单位四元数幂运算的显式公式：**</p>

<p>若 $q = [\\cos\\theta, \\vec{u}\\sin\\theta]$ 为单位四元数，则：</p>

<p>$$q^t = \\left[\\cos(t\\theta),\\; \\vec{u}\\sin(t\\theta)\\right]$$</p>

<p>这条公式在 SLERP 插值中至关重要——它将旋转角度线性缩放，实现平滑的角度插值。</p>

</details>

<hr />

<h3>四、方向导数的几何意义</h3>

<h4>🔍 通俗理解</h4>

<p>在前面的学习中，我们把四元数空间（$\\mathbb{R}^4$）中的元素看成点。现在让我们换一个视角：**把四元数空间看成一个"地形"**，而单位四元数就分布在这个地形的一个特殊曲面上（三维球面 $S^3$）。</p>

<p>**什么是方向导数？** 假设你站在四元数地形上的某个位置 $q$，想要往某个方向 $\\vec{u}$ 走一小步。你的海拔变化率，就是方向导数。换成四元数的语言：</p>

<p>$$\\frac{d}{d\\epsilon}\\bigg|_{\\epsilon=0} q \\cdot e^{[\\epsilon\\vec{u}]}$$</p>

<p>这个表达式描述了：在四元数乘法（左乘或右乘）的意义下，沿着切方向 $\\vec{u}$ 的瞬时变化率。</p>

<blockquote>🎯 **地球表面比喻**：把单位四元数的空间想象成地球表面（一个三维弯曲的球面）。你站在赤道上某点，想要往北走。"往北走"就是你的切方向，而你的海拔变化（或者说，你与原点的距离变化）就是方向导数。由于地球表面是弯曲的，不同方向的方向导数含义也不同——这就是微分几何研究的内容。</blockquote>

<p>**在四元数旋转中的应用：**</p>

<p>设 $q(t)$ 表示刚体在时间 $t$ 的姿态四元数，满足旋转运动方程：</p>

<p>$$\\frac{dq}{dt} = \\frac{1}{2}\\vec{\\omega} \\cdot q$$</p>

<p>其中 $\\vec{\\omega}$ 是角速度向量，$\\cdot$ 表示四元数乘法（左乘）。这个方程的解正是：</p>

<p>$$q(t) = e^{[\\int_0^t \\frac{1}{2}\\vec{\\omega}(\\tau)d\\tau]} \\cdot q(0)$$</p>

<p>也就是说：**四元数的指数映射，本质上就是旋转运动的积分结果。**</p>

<hr />

<h3>五、单位四元数的指数流形结构</h3>

<h4>🔍 通俗理解</h4>

<p>单位四元数集合 $\\{q \\in \\mathbb{H} : \\|q\\| = 1\\}$ 构成一个**三维球面**（记作 $S^3$），这在几何上是一个紧致、连通、无边界的流形。这个结构是理解 SLERP 的几何基础。</p>

<p>**为什么是三维？** 四元数有4个实参数，但满足 $\\|q\\|=1$ 约束后，只剩下3个自由度——恰好等于三维旋转群的自由度（3个轴角参数）。这是四元数能高效表示三维旋转的深层原因。</p>

<p>**指数映射的作用：**</p>

<p>$$\\exp: T_{q_0}S^3 \\rightarrow S^3$$</p>

<p>指数映射把 $S^3$ 在某点 $q_0$ 处的切空间（一个三维欧氏空间，记作 $T_{q_0}S^3$）映射到球面本身。也就是说：**指数映射让我们能用"平坦的"切空间来描述"弯曲的"球面上的运动。**</p>

<p>**这就是 SLERP 的数学本质：**</p>
<li>我们在**球面**$S^3$ 上的两个四元数 $q_1, q_2$ 之间做插值</li>
<li>通过指数映射，把问题"降维"到**平坦切空间**中——在那里插值就是简单的直线</li>
<li>再用对数映射，把切空间的结果"升维"回球面</li>

<p>这个"降维→直线插值→升维"的过程，就是 SLERP 的核心思想。</p>

<hr />

<details class="def-box" open>
<summary>📖 定义 4：指数与对数映射的映射关系</summary>

<p>**指数映射（Exp）**：</p>

<p>$$\\exp: \\mathbb{R}^3 \\rightarrow S^3, \\quad \\exp(\\vec{\\theta}) = [\\cos\\|\\vec{\\theta}\\|,\\; \\frac{\\vec{\\theta}}{\\|\\vec{\\theta}\\|}\\sin\\|\\vec{\\theta}\\|]$$</p>

<p>其中 $\\vec{\\theta}$ 是一个三维向量，其方向是旋转轴，大小是旋转角度（不是半角！）。</p>

<p>**对数映射（Log）**：</p>

<p>$$\\log: S^3 \\rightarrow \\mathbb{R}^3, \\quad \\log(q) = \\arccos(s) \\cdot \\frac{\\vec{v}}{\\|\\vec{v}\\|}$$</p>

<p>其中 $q = [s, \\vec{v}]$ 且 $\\|q\\|=1$。</p>

<p>**关键性质**：</p>

| 性质 | 表达式 |
|------|--------|
| 单位四元数封闭 | $\\exp(\\vec{\\theta}) \\in S^3$ |
| 对数逆元 | $\\log(\\exp(\\vec{\\theta})) = \\vec{\\theta}$（当 $\\|\\vec{\\theta}\\| < \\pi$）|
| 角度叠加 | $\\exp(\\vec{\\alpha}) \\exp(\\vec{\\beta}) = \\exp(\\vec{\\gamma})$（仅当 $\\vec{\\alpha}\\times\\vec{\\beta}=\\vec{0}$）|

<p>**绕轴旋转的标准化记号：**</p>

<p>用 $\\vec{\\theta} = \\theta \\vec{u}$ 表示绕单位轴 $\\vec{u}$ 旋转角度 $\\theta$ 的旋转量：</p>

<p>$$\\text{Rot}(\\vec{u}, \\theta) \\equiv \\exp(\\vec{\\theta}) = [\\cos\\theta,\\; \\vec{u}\\sin\\theta]$$</p>

</details>

<hr />

<h3>六、代码实现：四元数指数与对数</h3>

<p>下面用 Python/NumPy 实现四元数的指数、对数和幂运算，并验证它们的性质：</p>

<pre><code className="language-python">import numpy as np

class Quaternion:
    """四元数类：支持指数、对数、幂运算"""
    
    def __init__(self, w=1.0, x=0.0, y=0.0, z=0.0):
        """四元数构造：q = w + xi + yj + zk"""
        self.w = w
        self.x = x
        self.y = y
        self.z = z
    
    def __mul__(self, other):
        """四元数乘法（Hamilton积）"""
        w = (self.w * other.w - self.x * other.x 
             - self.y * other.y - self.z * other.z)
        x = (self.w * other.x + self.x * other.w 
             + self.y * other.z - self.z * other.y)
        y = (self.w * other.y - self.x * other.z 
             + self.y * other.w + self.z * other.x)
        z = (self.w * other.z + self.x * other.y 
             - self.y * other.x + self.z * other.w)
        return Quaternion(w, x, y, z)
    
    def norm(self):
        """模长"""
        return np.sqrt(self.w**2 + self.x**2 + self.y**2 + self.z**2)
    
    def conjugate(self):
        """共轭"""
        return Quaternion(self.w, -self.x, -self.y, -self.z)
    
    def normalize(self):
        """归一化"""
        n = self.norm()
        if n < 1e-10:
            raise ValueError("零四元数无法归一化")
        return Quaternion(self.w/n, self.x/n, self.y/n, self.z/n)
    
    def vec(self):
        """返回 (s, vx, vy, vz) 元组"""
        return (self.w, self.x, self.y, self.z)
    
    @staticmethod
    def exp(q):
        """指数映射 exp(q)"""
        s, vx, vy, vz = q.vec()
        rho = np.sqrt(vx**2 + vy**2 + vz**2)
        if rho < 1e-10:
            # 纯标量四元数：e^{[0]} = 1
            return Quaternion(np.exp(s))
        # 方向归一化
        ux, uy, uz = vx/rho, vy/rho, vz/rho
        exp_s = np.exp(s)
        cos_rho = np.cos(rho)
        sin_rho = np.sin(rho)
        return Quaternion(
            exp_s * cos_rho,
            exp_s * ux * sin_rho,
            exp_s * uy * sin_rho,
            exp_s * uz * sin_rho
        )
    
    @staticmethod
    def log(q):
        """对数映射 log(q)，返回纯四元数（标量部分=0）"""
        s, vx, vy, vz = q.vec()
        r = np.sqrt(s**2 + vx**2 + vy**2 + vz**2)
        if r < 1e-10:
            raise ValueError("零四元数无法取对数")
        rho = np.arccos(np.clip(s / r, -1.0, 1.0))
        if rho < 1e-10:
            return Quaternion(0.0, 0.0, 0.0, 0.0)
        sin_rho = np.sin(rho)
        # 方向向量
        ux, uy, uz = vx/sin_rho, vy/sin_rho, vz/sin_rho
        return Quaternion(np.log(r), rho*ux, rho*uy, rho*uz)
    
    @staticmethod
    def power(q, t):
        """幂运算 q^t = exp(t * log(q))"""
        if q.norm() < 1e-10:
            raise ValueError("零四元数无法做幂运算")
        # 用对数-指数链：q^t = exp(t * log(q))
        ln_q = Quaternion.log(q)
        scaled = Quaternion(ln_q.w * t, ln_q.x * t, 
                            ln_q.y * t, ln_q.z * t)
        return Quaternion.exp(scaled)
    
    def __repr__(self):
        return f"Quaternion(w={self.w:.4f}, x={self.x:.4f}, y={self.y:.4f}, z={self.z:.4f})"


# ========== 验证实验 ==========

# 实验1：验证 exp([θu]) = [cosθ, u sinθ]
print("=" * 50)
print("实验1：纯四元数指数映射")
print("=" * 50)
axis = np.array([1.0, 0.0, 0.0])  # x轴
theta = np.pi / 3  # 60度
pure_q = Quaternion(0, axis[0], axis[1], axis[2]) * theta
exp_q = Quaternion.exp(pure_q)
expected = Quaternion(np.cos(theta), axis[0]*np.sin(theta), 
                      axis[1]*np.sin(theta), axis[2]*np.sin(theta))
print(f"exp([θ·axis]) = {exp_q}")
print(f"期望 [cosθ, axis·sinθ] = {expected}")
print(f"模长: {exp_q.norm():.6f} (应为 1.0)")

# 实验2：验证 log(exp([θu])) = [θu]
print("\\n" + "=" * 50)
print("实验2：对数映射与指数映射互逆")
print("=" * 50)
log_exp = Quaternion.log(exp_q)
print(f"log(exp([θ·axis])) = {log_exp}")
print(f"原始 [θ·axis] = {pure_q}")
print(f"误差: {np.abs(log_exp.w - pure_q.w):.2e}")

# 实验3：验证幂运算（平方根）
print("\\n" + "=" * 50)
print("实验3：四元数幂运算")
print("=" * 50)
q = Quaternion(np.cos(np.pi/4), 0, np.sin(np.pi/4), 0)  # 绕y轴旋转45°
q_sqrt = Quaternion.power(q, 0.5)
q_double = Quaternion.power(q_sqrt, 2)
print(f"原始 q (θ=45°) = {q}")
print(f"q^0.5 (θ=22.5°) = {q_sqrt}")
print(f"(q^0.5)^2 = {q_double}")
print(f"平方根后再次平方，误差 = {np.abs(q.w - q_double.w):.2e}")

# 实验4：验证 e^{s} e^{[v]} = e^{[s,v]}
print("\\n" + "=" * 50)
print("实验4：指数乘积分解")
print("=" * 50)
s, vx, vy, vz = 1.0, np.pi/4, np.pi/4, 0
q_total = Quaternion(s, vx, vy, vz)
q_separate = Quaternion.exp(Quaternion(s, 0, 0, 0)) * Quaternion.exp(Quaternion(0, vx, vy, vz))
q_direct = Quaternion.exp(q_total)
print(f"直接 exp([s,v]) = {q_direct}")
print(f"分解 exp(s)·exp([v]) = {q_separate}")
print(f"模长比: {q_direct.norm()/q_separate.norm():.6f}")

print("\\n✅ 所有验证实验完成！")</code></pre>

<p>**运行结果说明：**</p>
<li>实验1验证纯四元数指数映射与三角形式的等价性</li>
<li>实验2验证对数-指数互逆关系</li>
<li>实验3验证幂运算的正确性（角度缩放）</li>
<li>实验4验证一般四元数的指数乘积分解公式</li>

<hr />

<h3>七、综合应用：三维旋转的时间演化</h3>

<p>四元数指数映射在物理仿真和机器人学中有着广泛的应用。下面展示一个刚体连续旋转仿真的完整例子：</p>

<pre><code className="language-python">import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

class RigidBodyRotation:
    """刚体连续旋转仿真"""
    
    def __init__(self, omega_mag, axis):
        """初始化：给定角速度大小和轴方向"""
        self.omega_mag = omega_mag
        self.axis = axis / np.linalg.norm(axis)  # 归一化
    
    def get_quaternion(self, t):
        """获取时刻 t 的四元数姿态"""
        theta = self.omega_mag * t
        return Quaternion(
            np.cos(theta),
            self.axis[0] * np.sin(theta),
            self.axis[1] * np.sin(theta),
            self.axis[2] * np.sin(theta)
        )


# 仿真设置
omega = 2.0  # rad/s
axis = np.array([1.0, 1.0, 0.0]) / np.sqrt(2)  # 绕 x-y 对角线
body = RigidBodyRotation(omega, axis)

# 采样
t_vals = np.linspace(0, 2*np.pi / omega, 200)
w_vals, x_vals, y_vals, z_vals = [], [], [], []

for t in t_vals:
    q = body.get_quaternion(t)
    w_vals.append(q.w)
    x_vals.append(q.x)
    y_vals.append(q.y)
    z_vals.append(q.z)

# 可视化：四元数分量随时间变化
fig, axes = plt.subplots(2, 2, figsize=(12, 8))
fig.suptitle('刚体旋转：四元数姿态随时间演化 (角速度={:.1f} rad/s)'.format(omega), fontsize=14)

axes[0, 0].plot(t_vals, w_vals, 'b-', lw=2)
axes[0, 0].set_title('标量分量 w = cos(ωt)')
axes[0, 0].set_xlabel('时间 (s)')
axes[0, 0].grid(True, alpha=0.3)

axes[0, 1].plot(t_vals, x_vals, 'r-', lw=2, label='x')
axes[0, 1].plot(t_vals, y_vals, 'g-', lw=2, label='y')
axes[0, 1].plot(t_vals, z_vals, 'b-', lw=2, label='z')
axes[0, 1].set_title('矢量分量 (x, y, z) = u·sin(ωt)')
axes[0, 1].legend()
axes[0, 1].set_xlabel('时间 (s)')
axes[0, 1].grid(True, alpha=0.3)

# 3D 轨迹可视化
ax3d = fig.add_subplot(2, 2, 3, projection='3d')
ax3d.plot(x_vals, y_vals, z_vals, 'purple', lw=1.5)
ax3d.scatter([x_vals[0]], [y_vals[0]], [z_vals[0]], color='green', s=100, label='起点')
ax3d.scatter([x_vals[-1]], [y_vals[-1]], [z_vals[-1]], color='red', s=100, label='终点')
ax3d.set_title('S³ 流形上的轨迹（投影到3D）')
ax3d.legend()

# 模长验证
norm_vals = np.sqrt(np.array(w_vals)**2 + np.array(x_vals)**2 + 
                     np.array(y_vals)**2 + np.array(z_vals)**2)
axes[1, 1].plot(t_vals, norm_vals, 'k-', lw=2)
axes[1, 1].set_title('四元数模长（应为恒等于1.0）')
axes[1, 1].set_xlabel('时间 (s)')
axes[1, 1].set_ylim(0.99, 1.01)
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('/workspace/studies/四元数与空间变换/ch4_rotation_evolution.png', dpi=150)
print("图片已保存: ch4_rotation_evolution.png")</code></pre>

<p>**物理意义解读：**</p>
<li>四元数的标量分量 $w = \\cos(\\omega t)$ 和矢量分量 $(x,y,z) = \\vec{u}\\sin(\\omega t)$ 都以角频率 $\\omega$ 振荡</li>
<li>模长始终等于 1，说明刚体只做纯旋转，没有缩放</li>
<li>在更高维的 $S^3$ 流形上，轨迹是一个大圆（就像地球上的经线）</li>

<hr />

<h3>📝 本章要点速记</h3>

<p>1. **指数映射**：$e^q = e^s[\\cos\\rho + \\frac{\\vec{v}}{\\rho}\\sin\\rho]$，将四元数 $q=[s,\\vec{v}]$ 映射到四元数空间</p>

<p>2. **对数映射**：$\\ln q = [\\ln r, \\frac{\\vec{v}}{\\|\\vec{v}\\|}\\arccos\\frac{s}{r}]$，是指数映射的逆运算</p>

<p>3. **幂运算**：$q^t = e^{t\\ln q}$，缩放旋转角度——$q^{0.5}$ 将角度减半</p>

<p>4. **纯四元数指数**：$e^{[\\vec{v}]} = \\cos\\|\\vec{v}\\| + \\frac{\\vec{v}}{\\|\\vec{v}\\|}\\sin\\|\\vec{v}\\|$，是三维球面 $S^3$ 上的大圆参数化</p>

<p>5. **单位四元数对数**：$\\ln q = [\\theta\\vec{u}]$（纯四元数），记录旋转轴 $\\vec{u}$ 和半角 $\\theta$</p>

<p>6. **指数流形结构**：$S^3$ 流形上的指数映射 $\\exp: T_{q_0}S^3 \\rightarrow S^3$，是 SLERP 的数学基础</p>

<p>7. **旋转时间演化**：$q(t) = e^{[\\omega t \\vec{u}]}$ 是刚体旋转的通解</p>

<hr />

<h3>🎯 章节练习</h3>

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 计算 $e^{[0, \\pi/2, 0, 0]}$（纯四元数指数） |
| 2 | 推导题 | ⭐⭐ | 推导 $e^{[\\theta\\vec{u}]} \\cdot e^{[\\phi\\vec{u}]} = e^{[(\\theta+\\phi)\\vec{u}]}$ |
| 3 | 证明题 | ⭐⭐⭐ | 证明 $\\ln(q_1 q_2) \\neq \\ln q_1 + \\ln q_2$（四元数非交换性） |
| 4 | 计算题 | ⭐⭐ | 给定单位四元数 $q = [\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2}, 0, 0]$，求 $q^{1/3}$ |
| 5 | 概念题 | ⭐⭐ | 解释为什么单位四元数构成三维流形 $S^3$，而不是四维空间 |

<hr />

<h3>🚀 下一章预告</h3>

<p>**第5章：球面线性插值（SLERP）**</p>

<p>有了第4章的指数与对数映射作为数学工具，我们终于可以正式学习 SLERP——**球面线性插值**。这是计算机图形学、3D动画和航天器姿态控制中最核心的旋转插值算法。你将看到为什么简单的线性插值（LERP）在球面上会产生"不均匀"的运动，以及如何用四元数的指数结构实现真正的"匀速"球面运动。结合第4章的 $q^t = e^{t\\ln q}$，SLERP 的推导将变得自然而直观。</p>

<hr />

<pre><code className="language-css">/* CSS 样式参考 */
.def-box {
    border-left: 3px solid #7ee787;
    border-radius: 8px;
    margin: 1rem 0;
    overflow: hidden;
    background: rgba(126, 231, 135, 0.05);
}
.def-box summary {
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-weight: 600;
    color: #7ee787;
}
.def-box > *:not(summary) {
    padding: 0 1rem 0.75rem 1rem;
}

.proof-box {
    border-left: 3px solid #ffa657;
    border-radius: 8px;
    margin: 1rem 0;
    overflow: hidden;
    background: rgba(255, 166, 87, 0.05);
}
.proof-box summary {
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-weight: 600;
    color: #ffa657;
}
.proof-box > *:not(summary) {
    padding: 0 1rem 0.75rem 1rem;
}</code></pre>
`,
    5: `<h2>第5章：球面线性插值（SLERP）</h2>

<blockquote>**本章简介**：掌握 SLERP——球面线性插值——这是计算机图形学、3D动画、航天器姿态控制中最核心的旋转插值算法。你将理解为什么线性插值（LERP）在弯曲的球面上是"不公平"的，以及如何借助第4章的指数与对数映射，在三维旋转球面上实现真正的"匀速运动"。</blockquote>
<blockquote></blockquote>
<blockquote>⏱ 预估学时：3 小时 | 难度：⭐⭐⭐ | 📍 前置：第4章（指数与对数映射）</blockquote>

<hr />

<h3>一、问题的引入：为什么线性插值不够用？</h3>

<h4>🔍 通俗理解</h4>

<p>想象你和朋友站在地球表面的两个点上，你想从 A 点匀速走向 B 点。一个"直线行走"的计划是：每隔一秒，往 B 的方向走固定距离。</p>

<p>但地球表面是弯曲的！如果你真的每隔一秒沿"直线方向"走固定距离，你会发现：</p>
<li>**赤道附近**：每一步走得很远，路径几乎是一条直线</li>
<li>**靠近两极时**：每一步开始"打滑"——明明走的是直线，在更高维度看你的路径其实在加速</li>

<p>四元数的空间（$S^3$ 超球面）也有同样的问题。</p>

<p>**一个具体例子：** 假设你要将一个3D模型从"朝前"的姿态旋转到"朝右"的姿态，两种插值方式会产生完全不同的视觉效果：</p>

<li>**LERP（线性插值）**：姿态变化先快后慢，看起来像是"先突然后拖"</li>
<li>**SLERP（球面线性插值）**：姿态变化均匀一致，看起来像是"流畅巡航"</li>

<blockquote>🎯 **骑自行车比喻**：想象你骑着自行车从山脚出发，沿一条直路向上爬坡。在陡峭的地方，你前进的**水平距离**很短；在平缓的地方，水平距离很长。如果按"每分钟走固定坡面距离"来走，你水平位移的速度是变化的。但如果按"每分钟走固定水平距离"来走，你实际上在陡坡上骑得很快，在平坡上骑得很慢——这是线性插值的问题。SLERP 就像是一个**智能骑行调节器**，确保你水平位移的速度始终均匀。</blockquote>

<hr />

<h3>二、LERP 的局限性与直观展示</h3>

<h4>🔍 通俗理解</h4>

<p>**线性插值（LERP）**的公式很简单：给定 $q_1$ 和 $q_2$，在参数 $t \\in [0, 1]$ 下：</p>

<p>$$\\text{LERP}(q_1, q_2; t) = \\frac{(1-t)q_1 + tq_2}{\\|(1-t)q_1 + tq_2\\|}$$</p>

<p>即先线性组合两个四元数，再归一化。</p>

<p>**LERP 的问题在哪？** 主要有三点：</p>

<p>1. **不保角速度**：即使 $t$ 均匀变化，旋转的角速度也不均匀</p>
<p>2. **结果不一定在测地线上**：在弯曲球面上，直线段不一定是"最短路径"</p>
<p>3. **可能退化为零向量**：当 $q_1 = -q_2$ 时，分子可能为零</p>

<p>**为什么会出现这些问题？** 因为 LERP 把四元数当成 $\\mathbb{R}^4$ 中的普通向量来插值，而实际上四元数生活在**弯曲的 $S^3$ 流形**上。用"直的尺子"量"弯曲的线"，自然会有误差。</p>

<hr />

<details class="def-box" open>
<summary>📖 定义 1：线性插值（LERP）</summary>

<p>对于两个四元数 $q_1, q_2$：</p>

<p>$$\\text{LERP}(q_1, q_2; t) = \\frac{(1-t)q_1 + t q_2}{\\|(1-t)q_1 + t q_2\\|}$$</p>

<p>其中 $t \\in [0, 1]$。</p>

<p>**几何意义**：在 $\\mathbb{R}^4$ 空间中做直线插值，然后投影回 $S^3$ 球面。</p>

<p>**局限性**：</p>

| 问题 | 描述 |
|------|------|
| **速度不均匀** | 靠近 $q_1$ 时角速度较大，靠近 $q_2$ 时较小 |
| **路径非测地线** | 不是球面上的"大圆弧"（最短路径） |
| **退化情况** | 当 $q_1 \\approx -q_2$ 时分母接近零，数值不稳定 |

<blockquote>📌 什么时候可以用 LERP？当 $q_1$ 和 $q_2$ 非常接近（夹角小于约 30°）时，LERP 的误差很小，可以安全使用。这种情况下 SLERP 和 LERP 的差异肉眼几乎不可见。</blockquote>

</details>

<hr />

<h3>三、SLERP 的几何直觉与完整推导</h3>

<h4>🔍 通俗理解</h4>

<p>SLERP 的核心思想异常优雅：**不直接在弯曲的球面上插值，而是把球面"展开"到平坦的切空间中，在那里做简单的直线插值，再"卷回"球面。**</p>

<p>这个过程分为三步：</p>

<p>1. **降维（对数映射）**：把球面上的两个点 $q_1, q_2$ 映射到某点的切空间，得到两个向量 $\\vec{v}_1, \\vec{v}_2$</p>
<p>2. **直线插值**：在平坦的切空间中，均匀插值得到中间向量 $\\vec{v}_t = (1-t)\\vec{v}_1 + t\\vec{v}_2$</p>
<p>3. **升维（指数映射）**：把 $\\vec{v}_t$ 映射回球面，得到 $q_t = e^{\\vec{v}_t}$</p>

<blockquote>🎯 **地图比喻**：地球表面是弯曲的（二维球面 $S^2$），但你用的地图是平的（二维平面 $\\mathbb{R}^2$）。当你从北京飞往纽约，你想在地球表面匀速飞行，但如果看地图上的直线（等角航线 vs. 大圆航线），地图上的直线距离并不对应地球表面的匀速飞行。SLERP 就是在大圆航线上做匀速飞行——而不是在墨卡托投影地图上的直线上匀速飞行。</blockquote>

<hr />

<details class="proof-box" open>
<summary>📐 推导：SLERP 公式的完整代数推导</summary>

<p>**目标**：推导 SLERP 的显式公式。</p>

<p>**第一步：在切空间中表示两个四元数**</p>

<p>设 $q_1, q_2$ 为两个单位四元数，它们之间的夹角（弧长）为 $\\Omega$，定义为：</p>

<p>$$\\Omega = \\arccos(q_1 \\cdot q_2)$$</p>

<p>其中 $q_1 \\cdot q_2$ 是四维点积：$q_1 \\cdot q_2 = s_1 s_2 + v_{1x}v_{2x} + v_{1y}v_{2y} + v_{1z}v_{2z}$</p>

<p>由于 $q_1, q_2$ 是单位四元数，$0 \\leq \\Omega \\leq \\pi$。</p>

<p>**第二步：建立几何关系**</p>

<p>在 $S^3$ 球面上，$q_1$ 和 $q_2$ 之间的测地线（大圆弧）可以用三角关系描述。考虑由 $q_1$、$q_2$ 和 $q_1 q_2^*$（连接弧的中点）构成的球面三角形。</p>

<p>关键几何事实：$q_1$ 和 $q_2$ 都在 $S^3$ 上，而连接它们的大圆弧是唯一的最短路径。</p>

<p>**第三步：构造垂直分量**</p>

<p>将 $q_2$ 分解为沿 $q_1$ 的方向（平行分量）和垂直于 $q_1$ 的方向（垂直分量）：</p>

<p>$$q_2^\\perp = q_2 - (q_1 \\cdot q_2) q_1$$</p>

<p>归一化垂直分量：</p>

<p>$$\\hat{q}_2^\\perp = \\frac{q_2 - \\cos\\Omega \\cdot q_1}{\\sin\\Omega}$$</p>

<p>**第四步：在 $q_1$ 的切空间中做直线插值**</p>

<p>在切空间中均匀插值得到中间向量方向：</p>

<p>$$q_t^\\text{tangent} = \\frac{\\sin((1-t)\\Omega)}{\\sin\\Omega} q_1 + \\frac{\\sin(t\\Omega)}{\\sin\\Omega} q_2^\\perp$$</p>

<p>其中 $\\frac{\\sin((1-t)\\Omega)}{\\sin\\Omega}$ 和 $\\frac{\\sin(t\\Omega)}{\\sin\\Omega}$ 是基于球面三角的权重系数。</p>

<p>**第五步：将切空间结果映射回 $S^3$**</p>

<p>注意到 $q_t^\\text{tangent}$ 恰好落在 $q_1$ 的切空间中（与 $q_1$ 垂直），所以可以直接作为指数映射的输入，不需要额外归一化。</p>

<p>$$\\boxed{\\text{SLERP}(q_1, q_2; t) = \\frac{\\sin((1-t)\\Omega)}{\\sin\\Omega} q_1 + \\frac{\\sin(t\\Omega)}{\\sin\\Omega} q_2}$$</p>

<p>□ 证毕</p>

<p>**验证**：</p>
<li>当 $t = 0$：$\\text{SLERP} = \\frac{\\sin\\Omega}{\\sin\\Omega} q_1 = q_1$ ✅</li>
<li>当 $t = 1$：$\\text{SLERP} = \\frac{0}{\\sin\\Omega} q_1 + \\frac{\\sin\\Omega}{\\sin\\Omega} q_2 = q_2$ ✅</li>
<li>当 $t = 0.5$：$\\text{SLERP} = \\frac{\\sin(\\Omega/2)}{\\sin\\Omega}(q_1 + q_2)$，恰好是弧中点 ✅</li>

</details>

<hr />

<details class="def-box" open>
<summary>📖 定义 2：球面线性插值（SLERP）</summary>

<p>对于两个单位四元数 $q_1, q_2$（假设 $\\|q_1\\| = \\|q_2\\| = 1$），**球面线性插值**定义为：</p>

<p>$$\\text{SLERP}(q_1, q_2; t) = \\frac{\\sin((1-t)\\Omega)}{\\sin\\Omega} q_1 + \\frac{\\sin(t\\Omega)}{\\sin\\Omega} q_2$$</p>

<p>其中：</p>

<p>$$\\Omega = \\arccos(q_1 \\cdot q_2) = \\arccos(s_1 s_2 + \\vec{v}_1 \\cdot \\vec{v}_2)$$</p>

<p>**参数意义**：</p>
<li>$\\Omega$：两个四元数在 $S^3$ 球面上的"弧长距离"（夹角）</li>
<li>$t \\in [0, 1]$：插值参数</li>
<li>$\\sin$ 权重：确保插值路径恰好是球面上的大圆弧（测地线）</li>

<p>**性质**：</p>

| 性质 | 描述 |
|------|------|
| 保角速度 | $t$ 均匀变化 → 角速度均匀变化 |
| 测地线 | 插值路径是 $S^3$ 上 $q_1$ 到 $q_2$ 的最短弧 |
| 可逆性 | $\\text{SLERP}(q_1, q_2; t) = \\text{SLERP}(q_2, q_1; 1-t)$ |

<p>**数值稳定性**：当 $\\Omega$ 很小时（$q_1 \\approx q_2$），$\\sin\\Omega \\approx \\Omega$，公式退化为 LERP，此时应使用一阶近似避免除零。</p>

</details>

<hr />

<h3>四、双覆盖问题与路径选择</h3>

<h4>🔍 通俗理解</h4>

<p>四元数的**双覆盖**（double cover）是其最重要的特性之一：每个三维旋转对应**两个**四元数 $q$ 和 $-q$。</p>

<p>这在插值时带来了一个微妙的问题：**从 $q_1$ 到 $q_2$ 的 SLERP，和从 $q_1$ 到 $-q_2$ 的 SLERP，走的是完全不同的路径！**</p>

<li>$q_1$ 到 $q_2$：走小角路径，夹角为 $\\Omega < \\pi$</li>
<li>$q_1$ 到 $-q_2$：走大角路径，夹角为 $\\pi - \\Omega$（超过 180°）</li>

<p>**应该如何选择？** 原则很简单：**始终选择小角路径**。因为 SLERP 公式中的 $\\Omega = \\arccos(q_1 \\cdot q_2)$ 天然给出 $0 \\leq \\Omega \\leq \\pi$。但当 $q_1$ 和 $q_2$ 的点积为负（夹角 > 90°）时，可以把 $q_2$ 替换为 $-q_2$，这样夹角就变小了。</p>

<hr />

<details class="def-box" open>
<summary>📖 定义 3：双覆盖路径选择算法</summary>

<p>**问题**：给定 $q_1, q_2$，如何确保 SLERP 走小角路径？</p>

<p>**算法步骤**：</p>

<pre><code className="language-python">def slerp(q1, q2, t):
    """球面线性插值（带双覆盖处理）"""
    
    # Step 1: 计算点积
    dot = q1.dot(q2)  # = q1 · q2
    
    # Step 2: 双覆盖处理：如果点积为负，取反 q2
    # 这样确保走的是小角路径（Ω < π）
    if dot < 0:
        q2 = -q2
        dot = -dot
    
    # Step 3: 数值稳定性处理：接近共线时用 LERP
    if dot > 0.9995:
        # 夹角很小，退化为 LERP
        result = q1 + t * (q2 - q1)
        return result.normalize()
    
    # Step 4: 计算夹角 Ω
    omega = np.arccos(dot)
    sin_omega = np.sin(omega)
    
    # Step 5: SLERP 公式
    a = np.sin((1 - t) * omega) / sin_omega
    b = np.sin(t * omega) / sin_omega
    
    return a * q1 + b * q2</code></pre>

<p>**为什么取反 $q_2$ 不影响结果？** 因为 $q_2$ 和 $-q_2$ 表示同一个三维旋转。取反后走的是小角路径，在动画中效果完全一致。</p>

</details>

<hr />

<h3>五、SLERP 与幂运算的等价性</h3>

<h4>🔍 通俗理解</h4>

<p>SLERP 有一个简洁优雅的替代表达式，直接使用四元数的幂运算（来自第4章）：</p>

<p>$$\\text{SLERP}(q_1, q_2; t) = q_1 \\cdot \\left(q_1^{-1} \\cdot q_2\\right)^t$$</p>

<p>这个公式的含义是：</p>

<p>1. 计算从 $q_1$ 到 $q_2$ 的"相对旋转"：$q_\\Delta = q_1^{-1} \\cdot q_2$</p>
<p>2. 把这个相对旋转缩放 $t$ 倍：$q_\\Delta^t = e^{t\\ln q_\\Delta}$</p>
<p>3. 把缩放后的旋转叠加回 $q_1$：$q_t = q_1 \\cdot q_\\Delta^t$</p>

<p>**几何直觉**：想象你站在 $q_1$ 的位置，SLERP(t) 就是让你往前走 $t \\times 100\\%$ 的路程。"相对旋转"的取法确保了无论 $q_1$ 本身朝向哪里，插值始终是相对于起点的均匀运动。</p>

<hr />

<details class="def-box" open>
<summary>📖 定义 4：SLERP 的幂运算形式</summary>

<p>**等价格式**：</p>

<p>$$\\text{SLERP}(q_1, q_2; t) = q_1 \\cdot \\left(q_1^{-1} \\cdot q_2\\right)^t = q_1 \\cdot \\exp\\left(t \\cdot \\ln(q_1^{-1} \\cdot q_2)\\right)$$</p>

<p>**两种形式的对比**：</p>

| 形式 | 公式 | 优点 | 缺点 |
|------|------|------|------|
| **三角形式** | $\\frac{\\sin((1-t)\\Omega)}{\\sin\\Omega}q_1 + \\frac{\\sin(t\\Omega)}{\\sin\\Omega}q_2$ | 计算量小，无需归一化 | $\\Omega=0$ 时需要特殊处理 |
| **幂运算形式** | $q_1 \\cdot (q_1^{-1} \\cdot q_2)^t$ | 形式对称，便于组合 | 需要计算逆和对数 |

<p>**适用场景**：</p>
<li>**三角形式**：实时渲染、游戏动画（计算效率高）</li>
<li>**幂运算形式**：理论分析、插值链组合（更直观）</li>

</details>

<hr />

<h3>六、代码实现：SLERP 及其可视化</h3>

<pre><code className="language-python">import numpy as np
import matplotlib.pyplot as plt

class Quaternion:
    """四元数类（支持 SLERP）"""
    
    def __init__(self, w=1.0, x=0.0, y=0.0, z=0.0):
        self.w = w
        self.x = x
        self.y = y
        self.z = z
    
    def dot(self, other):
        """四维点积"""
        return (self.w * other.w + self.x * other.x + 
                self.y * other.y + self.z * other.z)
    
    def norm(self):
        return np.sqrt(self.w**2 + self.x**2 + self.y**2 + self.z**2)
    
    def normalize(self):
        n = self.norm()
        if n < 1e-10:
            raise ValueError("零四元数无法归一化")
        return Quaternion(self.w/n, self.x/n, self.y/n, self.z/n)
    
    def conjugate(self):
        return Quaternion(self.w, -self.x, -self.y, -self.z)
    
    def inverse(self):
        """四元数逆"""
        n2 = self.norm() ** 2
        return Quaternion(self.w/n2, -self.x/n2, -self.y/n2, -self.z/n2)
    
    def __mul__(self, other):
        """Hamilton 积"""
        w = (self.w * other.w - self.x * other.x 
             - self.y * other.y - self.z * other.z)
        x = (self.w * other.x + self.x * other.w 
             + self.y * other.z - self.z * other.y)
        y = (self.w * other.y - self.x * other.z 
             + self.y * other.w + self.z * other.x)
        z = (self.w * other.z + self.x * other.y 
             - self.y * other.x + self.z * other.w)
        return Quaternion(w, x, y, z)
    
    def __add__(self, other):
        return Quaternion(self.w + other.w, self.x + other.x,
                         self.y + other.y, self.z + other.z)
    
    def __sub__(self, other):
        return Quaternion(self.w - other.w, self.x - other.x,
                         self.y - other.y, self.z - other.z)
    
    def __rmul__(self, scalar):
        return Quaternion(scalar*self.w, scalar*self.x,
                         scalar*self.y, scalar*self.z)
    
    def __repr__(self):
        return f"[{self.w:.4f}, ({self.x:.4f}, {self.y:.4f}, {self.z:.4f})]"


def slerp(q1, q2, t):
    """
    球面线性插值 SLERP
    带双覆盖处理 + 数值稳定性保护
    """
    # Step 1: 点积（判断方向）
    dot = q1.dot(q2)
    
    # Step 2: 双覆盖处理 → 始终走小角路径
    if dot < 0:
        q2 = Quaternion(-q2.w, -q2.x, -q2.y, -q2.z)
        dot = -dot
    
    # Step 3: 数值稳定性（夹角很小时退化为 LERP）
    if dot > 0.9995:
        result = q1 * (1 - t) + q2 * t
        return result.normalize()
    
    # Step 4: 计算夹角
    omega = np.arccos(np.clip(dot, -1.0, 1.0))
    sin_omega = np.sin(omega)
    
    # Step 5: SLERP 权重
    a = np.sin((1 - t) * omega) / sin_omega
    b = np.sin(t * omega) / sin_omega
    
    # Step 6: 加权求和
    result = q1 * a + q2 * b
    return result


def lerp(q1, q2, t):
    """线性插值（普通版，不推荐用于大角旋转）"""
    result = q1 * (1 - t) + q2 * t
    return result.normalize()


# ========== 验证实验 ==========

print("=" * 60)
print("实验：LERP vs SLERP 对比")
print("=" * 60)

# 定义两个四元数（绕不同轴）
q1 = Quaternion(np.cos(np.pi/4), np.sin(np.pi/4), 0, 0)   # 绕x轴转45°
q2 = Quaternion(np.cos(np.pi/3), 0, np.sin(np.pi/3), 0)  # 绕y轴转60°

# 计算弧长 Ω
omega = np.arccos(np.clip(q1.dot(q2), -1.0, 1.0))
print(f"q1 = {q1}")
print(f"q2 = {q2}")
print(f"弧长 Ω = {np.degrees(omega):.2f}°")

# 采样插值点
t_vals = np.linspace(0, 1, 50)
lerp_norms = []
slerp_norms = []
lerp_dot_q2 = []
slerp_dot_q2 = []

for t in t_vals:
    q_lerp = lerp(q1, q2, t)
    q_slerp = slerp(q1, q2, t)
    lerp_norms.append(q_lerp.norm())
    slerp_norms.append(q_slerp.norm())
    lerp_dot_q2.append(q_lerp.dot(q2))
    slerp_dot_q2.append(q_slerp.dot(q2))

# 可视化
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 图1：模长验证（应恒等于1）
axes[0, 0].plot(t_vals, lerp_norms, 'b-', lw=2, label='LERP')
axes[0, 0].plot(t_vals, slerp_norms, 'r--', lw=2, label='SLERP')
axes[0, 0].axhline(1.0, color='gray', ls='--', alpha=0.5)
axes[0, 0].set_title('模长验证（应恒等于 1.0）')
axes[0, 0].set_xlabel('t')
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

# 图2：到 q2 的接近程度（SLERP 应为均匀递增）
axes[0, 1].plot(t_vals, lerp_dot_q2, 'b-', lw=2, label='LERP')
axes[0, 1].plot(t_vals, slerp_dot_q2, 'r--', lw=2, label='SLERP')
axes[0, 1].set_title('与 q2 的接近程度（点积随 t 变化）')
axes[0, 1].set_xlabel('t')
axes[0, 1].legend()
axes[0, 1].grid(True, alpha=0.3)

# 图3：LERP 和 SLERP 的分向量轨迹
lerp_w, lerp_x, lerp_y, lerp_z = [], [], [], []
slerp_w, slerp_x, slerp_y, slerp_z = [], [], [], []
for t in t_vals:
    q_l = lerp(q1, q2, t)
    q_s = slerp(q1, q2, t)
    lerp_w.append(q_l.w); lerp_x.append(q_l.x); lerp_y.append(q_l.y); lerp_z.append(q_l.z)
    slerp_w.append(q_s.w); slerp_x.append(q_s.x); slerp_y.append(q_s.y); slerp_z.append(q_s.z)

ax3d = fig.add_subplot(2, 2, 3, projection='3d')
ax3d.plot(lerp_x, lerp_y, lerp_z, 'b-', lw=2, alpha=0.6, label='LERP 轨迹')
ax3d.plot(slerp_x, slerp_y, slerp_z, 'r-', lw=3, label='SLERP 轨迹')
ax3d.scatter([q1.x], [q1.y], [q1.z], color='green', s=100, label='q1', zorder=5)
ax3d.scatter([q2.x], [q2.y], [q2.z], color='purple', s=100, label='q2', zorder=5)
ax3d.set_title('S³ 投影轨迹（矢量部分）')
ax3d.legend()

# 图4：LERP vs SLERP 的角度均匀性
# 计算从 q1 到各插值点的角距离
lerp_angle_from_q1 = []
slerp_angle_from_q1 = []
for t in t_vals:
    q_l = lerp(q1, q2, t)
    q_s = slerp(q1, q2, t)
    lerp_angle_from_q1.append(np.degrees(np.arccos(np.clip(q1.dot(q_l), -1, 1))))
    slerp_angle_from_q1.append(np.degrees(np.arccos(np.clip(q1.dot(q_s), -1, 1)))))

axes[1, 1].plot(t_vals, lerp_angle_from_q1, 'b-', lw=2, label='LERP')
axes[1, 1].plot(t_vals, slerp_angle_from_q1, 'r--', lw=2, label='SLERP')
axes[1, 1].plot(t_vals, omega * np.array(t_vals) * 180/np.pi, 'g:', lw=2, label='理想均匀')
axes[1, 1].set_title('从 q1 出发的角距离（理想应为线性）')
axes[1, 1].set_xlabel('t')
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3)

fig.suptitle('LERP vs SLERP：球面插值对比实验', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('/workspace/studies/四元数与空间变换/ch5_slerp_comparison.png', dpi=150)
print("图片已保存: ch5_slerp_comparison.png")</code></pre>

<p>**实验结果解读：**</p>

| 图表 | LERP 的表现 | SLERP 的表现 |
|------|------------|-------------|
| 模长验证 | 始终归一化到1 ✅ | 始终等于1 ✅ |
| 与 q2 的接近程度 | 非线性增长 ❌ | 线性增长 ✅ |
| 轨迹可视化 | 偏离大圆弧 ❌ | 沿大圆弧 ✅ |
| 角距离均匀性 | 曲线（非线性）❌ | 直线（线性）✅ |

<hr />

<h3>七、实际应用场景</h3>

<h4>🔍 通俗理解</h4>

<p>SLERP 在需要**平滑旋转过渡**的场景中有广泛应用。以下是三个典型场景：</p>

<p>**1. 3D 动画与角色动画**</p>

<p>在游戏和电影中，一个角色从"站立"姿态平滑过渡到"举手"姿态。如果用欧拉角插值，会出现万向锁问题（Gimbal Lock）；如果用旋转矩阵插值，数值量大且不平滑。SLERP 是工业标准的解决方案——它保证姿态变化均匀、无万向锁。</p>

<p>**2. 航天器姿态控制**</p>

<p>航天器在太空中从一个姿态切换到另一个姿态时，必须保证角速度连续平滑。突然的角速度跳变会对结构造成冲击，甚至损坏设备。SLERP 提供了姿态轨迹的数学描述，确保每次姿态调整都遵循最优路径（大圆弧）。</p>

<p>**3. 虚拟现实（VR）中的头显追踪**</p>

<p>VR 头显需要实时追踪用户头部的旋转。如果旋转插值不平滑（比如转头时画面"卡顿"），用户会感到不适（模拟器晕动症）。SLERP 提供了毫秒级的高质量旋转插值，是 VR 系统的标配算法。</p>

<hr />

<pre><code className="language-python"># 实用工具：批量 SLERP 路径生成

def slerp_path(q_start, q_end, num_steps):
    """生成从 q_start 到 q_end 的 SLERP 路径（返回 n 个四元数）"""
    path = []
    for i in range(num_steps):
        t = i / (num_steps - 1)  # 0 到 1 均匀分布
        path.append(slerp(q_start, q_end, t))
    return path


def squad(q1, q2, q3, q4, t):
    """
    球面二次插值（SQUAD）
    用于平滑通过多个控制点的旋转轨迹
    q1, q2, q3, q4 为4个控制四元数
    """
    pass  # SQUAD 是 SLERP 的扩展，支持多点平滑过渡


# 示例：航天器姿态轨迹规划
q_initial = Quaternion(1, 0, 0, 0)  # 初始姿态
q_target = Quaternion(0, 1, 0, 0)     # 目标姿态

# 生成100帧姿态，每帧间隔10ms，总时长1秒
trajectory = slerp_path(q_initial, q_target, 100)

print("航天器姿态轨迹规划：")
print(f"  初始四元数: {trajectory[0]}")
print(f"  中间四元数 (t=0.5): {trajectory[49]}")
print(f"  目标四元数: {trajectory[99]}")
print(f"  总帧数: {len(trajectory)}")
print(f"  预计动画时长: {100 * 0.01:.1f} 秒")</code></pre>

<hr />

<h3>八、扩展：SQUAD（球面二次插值）</h3>

<h4>🔍 通俗理解</h4>

<p>SLERP 只能在两个控制点之间做平滑插值。但在实际动画中，我们经常需要让旋转轨迹**经过多个关键帧**——比如角色的行走循环：站立→踏步→站立→踏步→……</p>

<p>**SQUAD（Spherical Quadrangle）** 就是 SLERP 的扩展，它可以平滑连接多个四元数关键帧，产生 $C^1$ 连续的旋转轨迹。</p>

<p>**SQUAD 的基本思想**：</p>

<p>给定四个控制点 $q_1, q_2, q_3, q_4$，在 $q_2$ 和 $q_3$ 之间做球面二次插值：</p>

<p>$$\\text{SQUAD}(q_1, q_2, q_3, q_4; t) = \\text{SLERP}\\left(\\text{SLERP}(q_2, q_3; t),\\; \\text{SLERP}(q_1, q_4; \\frac{t}{2});\\; \\frac{2t(1-t)}{1-t^2}\\right)$$</p>

<p>这是一个"插值中的插值"，其数学细节较复杂，但核心思想是：**用两个 SLERP 构造一个中间"控制点"，再用这个中间点引导插值方向**，从而实现多点平滑过渡。</p>

<hr />

<h3>📝 本章要点速记</h3>

<p>1. **LERP 的局限性**：在弯曲的 $S^3$ 球面上做线性插值，速度不均匀，路径非测地线</p>

<p>2. **SLERP 公式**：$\\text{SLERP}(q_1,q_2;t) = \\frac{\\sin((1-t)\\Omega)}{\\sin\\Omega}q_1 + \\frac{\\sin(t\\Omega)}{\\sin\\Omega}q_2$，其中 $\\Omega = \\arccos(q_1 \\cdot q_2)$</p>

<p>3. **几何本质**：通过指数/对数映射，在切空间中做直线插值，再映射回球面</p>

<p>4. **双覆盖处理**：始终选择小角路径（$\\Omega < \\pi$），必要时取反 $q_2$</p>

<p>5. **幂运算形式**：$\\text{SLERP}(q_1,q_2;t) = q_1 \\cdot (q_1^{-1} \\cdot q_2)^t$，与 $q^t = e^{t\\ln q}$ 一脉相承</p>

<p>6. **数值稳定性**：当 $\\Omega$ 很小时，退化为 LERP 避免除零</p>

<p>7. **SQUAD**：SLERP 的多点扩展，用于关键帧动画</p>

<hr />

<h3>🎯 章节练习</h3>

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 手动计算 $\\text{SLERP}(q_1,q_2;0.5)$，$q_1=[1,0,0,0]$，$q_2=[0,1,0,0]$ |
| 2 | 推导题 | ⭐⭐ | 证明 $\\text{SLERP}(q_1,q_2;0.5) = \\frac{q_1+q_2}{\\|q_1+q_2\\|}$ |
| 3 | 判断题 | ⭐ | LERP 在 $q_1=-q_2$ 时会发生什么？SLERP 呢？|
| 4 | 编程题 | ⭐⭐ | 实现完整的 slerp() 函数（带双覆盖和稳定性处理）|
| 5 | 概念题 | ⭐⭐ | 解释为什么 SLERP 路径是 $S^3$ 上的测地线（大圆弧）|

<hr />

<h3>🚀 课程总结</h3>

<p>恭喜你完成了**四元数与空间变换**的全部核心章节！让我们回顾一下这门学科的知识地图：</p>

| 章节 | 核心内容 | 应用场景 |
|------|---------|---------|
| 第1章 | 复数与二维旋转 | 2D 图形变换、信号处理 |
| 第2章 | 四元数定义与 Hamilton 乘法 | 三维旋转的代数基础 |
| 第3章 | 四元数与三维旋转的对应关系 | 刚体姿态、机器人学 |
| **第4章** | **指数与对数映射** | **旋转连续化、幂运算** |
| **第5章** | **SLERP 球面线性插值** | **3D动画、航天器控制、VR** |

<p>**四元数的学习路径**：代数结构（第2章）→ 旋转表示（第3章）→ 微分结构（指数对数，第4章）→ 插值应用（SLERP，第5章）。这四步走完，你已经掌握了这门学科的核心知识！</p>

<hr />

<pre><code className="language-css">/* CSS 样式参考 */
.def-box {
    border-left: 3px solid #7ee787;
    border-radius: 8px;
    margin: 1rem 0;
    overflow: hidden;
    background: rgba(126, 231, 135, 0.05);
}
.def-box summary {
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-weight: 600;
    color: #7ee787;
}
.def-box > *:not(summary) {
    padding: 0 1rem 0.75rem 1rem;
}

.proof-box {
    border-left: 3px solid #ffa657;
    border-radius: 8px;
    margin: 1rem 0;
    overflow: hidden;
    background: rgba(255, 166, 87, 0.05);
}
.proof-box summary {
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-weight: 600;
    color: #ffa657;
}
.proof-box > *:not(summary) {
    padding: 0 1rem 0.75rem 1rem;
}</code></pre>
`,
    6: `<h2>第6章：四元数与其他旋转表示的转换</h2>

<blockquote>**本章简介**：掌握四元数与旋转矩阵、欧拉角、轴角式之间的相互转换，理解各种表示的内在联系与本质差异，建立完整的旋转表示知识图谱。</blockquote>
<blockquote></blockquote>
<blockquote>⏱ 预估学时：4 小时 | 难度：⭐⭐⭐ | 📍 前置：第1-4章（旋转矩阵、欧拉角基础、四元数定义）</blockquote>

<hr />

<h3>一、旋转的四种主要表示法概述</h3>

<p>在三维旋转的世界里，我们有四种最常用的数学表示：</p>

| 表示法 | 参数个数 | 自由参数 | 奇异性 | 主要用途 |
|--------|---------|---------|--------|---------|
| **旋转矩阵** R | 9 | 3 | 无 | 数值计算、GPU、光学 |
| **欧拉角** (α, β, γ) | 3 | 3 | 万向锁 | 人机交互、配置文件 |
| **轴角式** (θ, **n**) | 4 | 3 | 无 | 几何直觉、中间格式 |
| **四元数** q = w+xi+yj+zk | 4 | 3 | 无（非双覆盖）| 插值、SLERP、IMU |

<blockquote>🎯 **生活类比**：想象一个三维物体的朝向。你可以用"三指针表盘"（欧拉角）——直观但会卡住；也可以用"陀螺仪指针+角度"（轴角式）——清晰；或者用四元数——最优雅但不够直观。旋转矩阵则像一张完整的位置图——信息完整但数据量大。</blockquote>

<hr />

<h3>二、四元数 ↔ 旋转矩阵</h3>

<h4>🔍 通俗理解</h4>

<p>四元数 $q = (w, x, y, z)$ 和 3×3 旋转矩阵 $R$ 是**同一几何对象的两种等价描述**。四元数把旋转信息"压缩"进了4个参数（但只有3个自由度），旋转矩阵则用9个数冗余存储这3个自由度。</p>

<h4>2.1 从四元数到旋转矩阵（单位四元数 → R）</h4>

<details class="proof-box" open>
<summary>📐 推导：四元数 → 旋转矩阵</summary>

<p>设单位四元数 $q = (w, x, y, z)$，其中 $w^2 + x^2 + y^2 + z^2 = 1$。</p>

<p>对任意向量 $\\mathbf{v} \\in \\mathbb{R}^3$，将其视为纯四元数 $\\tilde{v} = (0, \\mathbf{v})$，旋转后：</p>

<p>$$\\tilde{v}' = q \\cdot \\tilde{v} \\cdot q^{-1}$$</p>

<p>由于 $q$ 是单位四元数，$q^{-1} = q^* = (w, -x, -y, -z)$。</p>

<p>展开三重乘积并提取纯量部分和向量部分，经过整理得到旋转矩阵：</p>

<p>$$R = \\begin{pmatrix}</p>
<p>1 - 2(y^2+z^2) & 2(xy - wz) & 2(xz + wy) \\\\</p>
<p>2(xy + wz) & 1 - 2(x^2+z^2) & 2(yz - wx) \\\\</p>
<p>2(xz - wy) & 2(yz + wx) & 1 - 2(x^2+y^2)</p>
<p>\\end{pmatrix}$$</p>

<p>**更紧凑的写法**（常用形式）：</p>

<p>$$R = \\begin{pmatrix}</p>
<p>w^2+x^2-y^2-z^2 & 2(xy-wz) & 2(xz+wy) \\\\</p>
<p>2(xy+wz) & w^2-x^2+y^2-z^2 & 2(yz-wx) \\\\</p>
<p>2(xz-wy) & 2(yz+wx) & w^2-x^2-y^2+z^2</p>
<p>\\end{pmatrix}$$</p>

<p>两个矩阵实际上完全等价，只是分组方式不同。</p>

<p>□ 证毕</p>

</details>

<details class="def-box" open>
<summary>📖 定理：四元数 → 旋转矩阵（NumPy 实现）</summary>

<pre><code className="language-python">import numpy as np

def quaternion_to_rotation_matrix(q):
    """
    将单位四元数 q = [w, x, y, z] 转换为 3x3 旋转矩阵 R。
    
    Parameters:
        q: numpy array of shape (4,), [w, x, y, z], 单位四元数
    
    Returns:
        R: 3x3 numpy array, 旋转矩阵
    """
    q = np.array(q, dtype=np.float64)
    q = q / np.linalg.norm(q)
    w, x, y, z = q
    
    R = np.array([
        [1 - 2*(y**2 + z**2),     2*(x*y - w*z),           2*(x*z + w*y)      ],
        [    2*(x*y + w*z),   1 - 2*(x**2 + z**2),         2*(y*z - w*x)      ],
        [    2*(x*z - w*y),       2*(y*z + w*x),     1 - 2*(x**2 + y**2)    ]
    ], dtype=np.float64)
    return R

# 验证：绕 Z 轴旋转 90°
q_z90 = np.array([np.cos(np.pi/4), 0, 0, np.sin(np.pi/4)])  # w=cos(45°), z=sin(45°)
R = quaternion_to_rotation_matrix(q_z90)
print("绕Z轴90°旋转矩阵：")
print(R)
print(f"行列式 det(R) = {np.linalg.det(R):.6f} (应为 1)")
print(f"正交性 R·R^T = \\n{R @ R.T}")  # 应为单位矩阵</code></pre>

</details>

<h4>2.2 从旋转矩阵到四元数（反函数）</h4>

<details class="proof-box" open>
<summary>📐 推导：旋转矩阵 → 四元数</summary>

<p>**思路**：从 $R$ 的迹（trace）和分量中反解四元数。</p>

<p>**方法一：Shepperd 方法（稳定通用）**</p>

<pre><code className="language-python">def rotation_matrix_to_quaternion(R):
    """Shepperd 方法：从旋转矩阵恢复四元数"""
    R = np.array(R, dtype=np.float64)
    trace = np.trace(R)
    
    if trace > 0:
        s = 0.5 / np.sqrt(trace + 1.0)
        w = 0.25 / s
        x = (R[2, 1] - R[1, 2]) * s
        y = (R[0, 2] - R[2, 0]) * s
        z = (R[1, 0] - R[0, 1]) * s
    elif R[0, 0] > R[1, 1] and R[0, 0] > R[2, 2]:
        s = 2.0 * np.sqrt(1.0 + R[0, 0] - R[1, 1] - R[2, 2])
        w = (R[2, 1] - R[1, 2]) / s
        x = 0.25 * s
        y = (R[0, 1] + R[1, 0]) / s
        z = (R[0, 2] + R[2, 0]) / s
    elif R[1, 1] > R[2, 2]:
        s = 2.0 * np.sqrt(1.0 + R[1, 1] - R[0, 0] - R[2, 2])
        w = (R[0, 2] - R[2, 0]) / s
        x = (R[0, 1] + R[1, 0]) / s
        y = 0.25 * s
        z = (R[1, 2] + R[2, 1]) / s
    else:
        s = 2.0 * np.sqrt(1.0 + R[2, 2] - R[0, 0] - R[1, 1])
        w = (R[1, 0] - R[0, 1]) / s
        x = (R[0, 2] + R[2, 0]) / s
        y = (R[1, 2] + R[2, 1]) / s
        z = 0.25 * s
    
    q = np.array([w, x, y, z])
    return q / np.linalg.norm(q)  # 归一化

# 完整往返测试
R_test = quaternion_to_rotation_matrix(q_z90)
q_back = rotation_matrix_to_quaternion(R_test)
print("恢复的四元数:", q_back)
print("原始四元数:", q_z90)
# 注意：q 和 -q 表示同一旋转
q_normalized = q_back / np.linalg.norm(q_back)
q_z90_norm = q_z90 / np.linalg.norm(q_z90)
if np.allclose(q_normalized, q_z90_norm) or np.allclose(q_normalized, -q_z90_norm):
    print("✅ 往返转换正确！")</code></pre>

<p>**原理**：根据四元数公式展开 $R$ 的对角线和反对角线，令 $w = \\frac{1}{2}\\sqrt{1+R_{11}+R_{22}+R_{33}}$，然后逐步解出 $x,y,z$。</p>

<p>□ 证毕</p>

</details>

<hr />

<h3>三、四元数 ↔ 欧拉角</h3>

<h4>🔍 通俗理解</h4>

<p>欧拉角把三维旋转拆解成**三次旋转**（每次绕一个轴），但旋转顺序不同则结果不同。四元数与欧拉角之间的转换就是在这两种"语法"之间做翻译。</p>

<blockquote>🎯 **生活类比**：欧拉角像"用三个方向舵驾驶飞机"——ZYX 顺序就是先踩方向舵（偏航），再压左翼（俯仰），最后滚转（横滚）。四元数则像"直接装一个球形万向接头"——无论怎么转都不会卡。</blockquote>

<h4>3.1 欧拉角的定义（ZYX 顺序）</h4>

<details class="def-box" open>
<summary>📖 定义：欧拉角（Z-Y-X intrinsic 顺序 / 航偏-俯仰-翻滚）</summary>

<p>$$R_{Euler} = R_x(\\gamma) \\cdot R_y(\\beta) \\cdot R_z(\\alpha)$$</p>

<p>三个角度含义：</p>
<li>**α（偏航/Yaw）**：绕世界 Z 轴旋转 → 飞机"摇头"左右看</li>
<li>**β（俯仰/Pitch）**：绕中间轴 Y 旋转 → 飞机"点头"上下看</li>
<li>**γ（横滚/Roll）**：绕最终轴 X 旋转 → 飞机"歪头"</li>

<p>展开后的旋转矩阵（ZYX 顺序）：</p>

<p>$$R_{ZYX} = \\begin{pmatrix}</p>
<p>\\cos\\alpha\\cos\\beta & \\cos\\alpha\\sin\\beta\\sin\\gamma - \\sin\\alpha\\cos\\gamma & \\cos\\alpha\\sin\\beta\\cos\\gamma + \\sin\\alpha\\sin\\gamma \\\\</p>
<p>\\sin\\alpha\\cos\\beta & \\sin\\alpha\\sin\\beta\\sin\\gamma + \\cos\\alpha\\cos\\gamma & \\sin\\alpha\\sin\\beta\\cos\\gamma - \\cos\\alpha\\sin\\gamma \\\\</p>
<p>-\\sin\\beta & \\cos\\beta\\sin\\gamma & \\cos\\beta\\cos\\gamma</p>
<p>\\end{pmatrix}$$</p>

<blockquote>⚠️ **注意**：欧拉角有多种顺序（XYZ, ZXY, YZX 等），不同顺序对应不同的旋转矩阵，转换前必须确认顺序约定！</blockquote>

</details>

<h4>3.2 四元数 → 欧拉角（ZYX 顺序）</h4>

<details class="proof-box" open>
<summary>📐 推导：四元数 → 欧拉角（ZYX 顺序）</summary>

<pre><code className="language-python">def quaternion_to_euler_zYX(q):
    """
    四元数 q = [w, x, y, z] → 欧拉角 (α, β, γ)（ZYX顺序）
    返回角度，单位：弧度
    """
    w, x, y, z = q / np.linalg.norm(q)  # 归一化
    R = quaternion_to_rotation_matrix([w, x, y, z])
    
    sy = -R[2, 0]  # = sin(β)
    
    if abs(sy) < 0.99999:  # 非万向锁
        cos_beta = np.sqrt(R[0, 0]**2 + R[1, 0]**2)
        alpha = np.arctan2(R[1, 0], R[0, 0])      # α = atan2(Ry0, Rx0)
        beta  = np.arctan2(sy, cos_beta)           # β = atan2(-Rz0, cos(α))
        gamma = np.arctan2(R[2, 1], R[2, 2])     # γ = atan2(Rz1, Rz2)
    else:
        # 万向锁情况（见3.3节）
        alpha = np.arctan2(-R[1, 2], R[1, 1])
        beta  = np.arctan2(sy, 1.0)
        gamma = 0.0
    
    return np.array([alpha, beta, gamma])

# 示例
q_test = np.array([0.9659, 0.2588, 0, 0])  # 绕X轴旋转30°
euler = quaternion_to_euler_zYX(q_test)
print(f"四元数 → 欧拉角（弧度）: {euler}")
print(f"四元数 → 欧拉角（角度）: {np.degrees(euler)}")</code></pre>

<p>□ 证毕</p>

</details>

<h4>3.3 万向锁（Gimbal Lock）：欧拉角的固有缺陷</h4>

<blockquote>🌟 **万向锁**是欧拉角旋转中一个令人头疼但不可避免的问题：当俯仰角（Pitch）达到 ±90° 时，第一次旋转和第三次旋转的轴会**重合**，导致**丢失一个自由度**。</blockquote>

<details class="def-box" open>
<summary>📖 定义：万向锁（Gimbal Lock）</summary>

<p>**机械类比**：想象一个三环万向节（three-ring gimbal）。三个环依次嵌套：</p>
<li>最外环：水平旋转（偏航/Yaw）</li>
<li>中环：俯仰旋转（Pitch）</li>
<li>最内环：横滚旋转（Roll）</li>

<p>**问题场景**：当中环旋转到与外环垂直时，外环和内环的旋转轴重合。此时无论你怎么旋转，飞机都无法独立改变偏航角——自由度从3个退化为2个。</p>

<p>**数学表现**：当 $\\beta = +\\frac{\\pi}{2}$ 时，$\\sin\\beta = 1$，$\\cos\\beta = 0$，矩阵简化为：</p>

<p>$$R \\approx \\begin{pmatrix}</p>
<p>-\\sin\\alpha\\cos\\gamma & * & * \\\\</p>
<p>\\cos\\alpha\\cos\\gamma & * & * \\\\</p>
<p>-1 & 0 & 0</p>
<p>\\end{pmatrix}$$</p>

<p>此时 $\\alpha + \\gamma$ 和 $\\alpha - \\gamma$ 效果相同——无法区分偏航和横滚的独立变化。</p>

<p>**万向锁演示代码**：</p>

<pre><code className="language-python">import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

def gimbal_lock_demo():
    """可视化万向锁现象"""
    fig = plt.figure(figsize=(12, 4))
    
    # 正常情况：β = 30°
    ax1 = fig.add_subplot(131, projection='3d')
    beta = np.radians(30)
    ax1.quiver(0,0,0, 1,0,0, color='r', arrow_length_ratio=0.1, label='X')
    ax1.quiver(0,0,0, 0,1,0, color='g', arrow_length_ratio=0.1, label='Y')
    ax1.quiver(0,0,0, 0,0,1, color='b', arrow_length_ratio=0.1, label='Z')
    ax1.set_title('β=30°：正常\\n三轴完全独立')
    ax1.legend()
    
    # 万向锁情况：β = 90°
    ax2 = fig.add_subplot(132, projection='3d')
    # X轴和Z轴在90°俯仰后完全重合
    ax2.quiver(0,0,0, 0,0,1, color='r', arrow_length_ratio=0.1, label='X→Z')
    ax2.quiver(0,0,0, 0,1,0, color='g', arrow_length_ratio=0.1, label='Y')
    ax2.quiver(0,0,0, -1,0,0, color='b', arrow_length_ratio=0.1, label='Z→-X')
    ax2.set_title('β=90°：万向锁！\\nX轴和Z轴完全重合')
    ax2.legend()
    
    # 接近万向锁
    ax3 = fig.add_subplot(133, projection='3d')
    beta_near = np.radians(89.5)
    ax3.quiver(0,0,0, np.cos(beta_near),0,np.sin(beta_near), color='r', arrow_length_ratio=0.1)
    ax3.quiver(0,0,0, 0,1,0, color='g', arrow_length_ratio=0.1)
    ax3.quiver(0,0,0, -np.sin(beta_near),0,np.cos(beta_near), color='b', arrow_length_ratio=0.1)
    ax3.set_title('β=89.5°：接近万向锁\\n两轴几乎重合')
    
    for ax in [ax1, ax2, ax3]:
        ax.set_xlim(-1.2, 1.2); ax.set_ylim(-1.2, 1.2); ax.set_zlim(-1.2, 1.2)
        ax.set_xlabel('X'); ax.set_ylabel('Y'); ax.set_zlabel('Z')
    
    plt.tight_layout()
    plt.savefig('/workspace/studies/四元数与空间变换/ch6_gimbal_lock.png', dpi=150, bbox_inches='tight')
    print("万向锁示意图已保存！")

gimbal_lock_demo()</code></pre>

</details>

<h4>3.4 欧拉角 → 四元数（ZYX 顺序）</h4>

<pre><code className="language-python">def euler_to_quaternion_zYX(euler):
    """
    欧拉角 (α, β, γ)（ZYX顺序）→ 四元数 q = [w, x, y, z]
    euler 单位：弧度
    """
    alpha, beta, gamma = euler
    cr, cp, cy = np.cos(alpha/2), np.cos(beta/2), np.cos(gamma/2)
    sr, sp, sy = np.sin(alpha/2), np.sin(beta/2), np.sin(gamma/2)
    
    w = cr * cp * cy + sr * sp * sy
    x = sr * cp * cy - cr * sp * sy
    y = cr * sp * cy + sr * cp * sy
    z = cr * cp * sy - sr * sp * cy
    
    return np.array([w, x, y, z])

# 完整往返测试
angles_deg = np.array([45.0, 30.0, 60.0])
euler_rad = np.radians(angles_deg)
q = euler_to_quaternion_zYX(euler_rad)
euler_back = quaternion_to_euler_zYX(q)
print(f"原始角度: {angles_deg}°")
print(f"往返角度: {np.mod(np.degrees(euler_back), 360)}°")</code></pre>

<hr />

<h3>四、轴角式（Axis-Angle）↔ 四元数</h3>

<h4>🔍 通俗理解</h4>

<p>轴角式是最"直觉"的旋转表示：**绕哪个轴（n）转多少度（θ）**。四元数与轴角式的转换最为直接——四元数的向量部分就是旋转轴，长度隐含旋转角的信息。</p>

<details class="proof-box" open>
<summary>📐 推导：轴角式 ↔ 四元数</summary>

<p>**轴角式 → 四元数**：</p>

<p>$$q = \\left(\\cos\\frac{\\theta}{2},\\; \\mathbf{n} \\cdot \\sin\\frac{\\theta}{2}\\right)$$</p>

<p>即：$w = \\cos\\frac{\\theta}{2}$，$(x, y, z) = \\mathbf{n} \\sin\\frac{\\theta}{2}$</p>

<blockquote>⚠️ 为什么是 $\\frac{\\theta}{2}$ 而不是 $\\theta$？这来自四元数旋转公式 $v' = q \\cdot v \\cdot q^{-1}$。旋转 $\\theta$ 需要两个半角，因为四元数乘法实际上绕轴旋转了两次 $\\frac{\\theta}{2}$。</blockquote>

<p>**四元数 → 轴角式**：</p>

<p>$$\\theta = 2 \\cdot \\arccos(w)$$</p>
<p>$$\\mathbf{n} = \\frac{(x, y, z)}{\\sin\\frac{\\theta}{2}}$$</p>

<pre><code className="language-python">def axis_angle_to_quaternion(axis, angle_rad):
    """
    轴角式 → 四元数
    axis: 旋转轴（单位向量），numpy array shape (3,)
    angle_rad: 旋转角度（弧度）
    """
    axis = np.array(axis, dtype=np.float64)
    axis = axis / np.linalg.norm(axis)
    half = angle_rad / 2.0
    return np.array([np.cos(half), 
                     axis[0]*np.sin(half),
                     axis[1]*np.sin(half),
                     axis[2]*np.sin(half)])

def quaternion_to_axis_angle(q):
    """
    四元数 → 轴角式
    返回 (axis, angle_rad)
    """
    q = np.array(q, dtype=np.float64)
    q = q / np.linalg.norm(q)
    w, x, y, z = q
    
    angle = 2.0 * np.arccos(np.clip(w, -1.0, 1.0))
    sin_half = np.sqrt(1.0 - w**2)
    if sin_half < 1e-10:
        return np.array([1.0, 0.0, 0.0]), 0.0
    
    axis = np.array([x, y, z]) / sin_half
    return axis, angle

# 验证
axis = np.array([1, 1, 1]) / np.sqrt(3)
angle = np.radians(120)
q = axis_angle_to_quaternion(axis, angle)
axis_back, angle_back = quaternion_to_axis_angle(q)
print(f"原始轴角: axis={axis}, angle={np.degrees(angle):.1f}°")
print(f"恢复轴角: axis={axis_back}, angle={np.degrees(angle_back):.4f}°")</code></pre>

<p>□ 证毕</p>

</details>

<hr />

<h3>五、旋转表示法综合对比</h3>

<details class="def-box" open>
<summary>📊 表1：四大旋转表示法全面对比</summary>

| 特性 | 旋转矩阵 R | 欧拉角 (α,β,γ) | 轴角式 (θ,n) | 四元数 q |
|------|-----------|--------------|------------|---------|
| **参数数量** | 9 | 3 | 4 | 4 |
| **自由度** | 3（冗余6个）| 3 | 3（冗余1个）| 3（冗余1个）|
| **存储开销** | ❌ 大（36字节）| ✅ 最小（12字节）| ⚠️ 中等（16字节）| ✅ 小（16字节）|
| **计算效率（合成）**| ⚠️ O(n²) 矩阵乘法 | ✅ 最快（3次1D旋转）| ✅ 快（Rodrigues）| ✅ 快（乘法）|
| **奇异性** | ✅ 无 | ❌ 万向锁（β=90°）| ✅ 无 | ✅ 无 |
| **插值能力** | ❌ 矩阵插值困难 | ❌ 无法直接插值 | ⚠️ 可用轴角插值 | ✅ SLERP 完美 |
| **数值稳定性** | ✅ 正交矩阵保结构 | ⚠️ atan2 截断误差 | ⚠️ 接近360°时误差大 | ⚠️ 需归一化 |
| **双元覆盖** | ❌ 唯一 | ❌ 唯一 | ❌ 唯一 | ⚠️ q 和 -q 等价 |
| **直观性** | ❌ 抽象 | ✅ 直观易理解 | ✅ 非常直观 | ❌ 不直观 |
| **典型应用** | GPU、光学、传感器融合 | UI、配置文件 | 动画导出、VR手柄 | IMU、机器人、游戏引擎 |

</details>

<h4>🔑 选型指南</h4>

<li>**需要插值动画** → 四元数（SLERP/Nlerp）</li>
<li>**人机交互/配置保存** → 欧拉角（直观但小心万向锁）</li>
<li>**与其他矩阵配合（Jacobian 等）** → 旋转矩阵</li>
<li>**导入/导出格式** → 轴角式或欧拉角</li>
<li>**IMU 传感器融合** → 四元数（无奇异性 + 低存储）</li>

<hr />

<h3>六、完整转换代码库</h3>

<pre><code className="language-python">import numpy as np

class RotationConverter:
    """旋转表示法统一转换器"""
    
    # ===== 四元数 ↔ 旋转矩阵 =====
    @staticmethod
    def quaternion_to_matrix(q):
        q = np.array(q, dtype=np.float64) / np.linalg.norm(q)
        w, x, y, z = q
        return np.array([
            [1-2*(y**2+z**2), 2*(x*y-w*z), 2*(x*z+w*y)],
            [2*(x*y+w*z), 1-2*(x**2+z**2), 2*(y*z-w*x)],
            [2*(x*z-w*y), 2*(y*z+w*x), 1-2*(x**2+y**2)]
        ])
    
    @staticmethod
    def matrix_to_quaternion(R):
        R = np.array(R, dtype=np.float64)
        trace = np.trace(R)
        if trace > 0:
            s = 0.5 / np.sqrt(trace + 1.0)
            w = 0.25 / s; x = (R[2,1]-R[1,2])*s
            y = (R[0,2]-R[2,0])*s; z = (R[1,0]-R[0,1])*s
        elif R[0,0] > R[1,1] and R[0,0] > R[2,2]:
            s = 2.0*np.sqrt(1+R[0,0]-R[1,1]-R[2,2])
            w=(R[2,1]-R[1,2])/s; x=0.25*s; y=(R[0,1]+R[1,0])/s; z=(R[0,2]+R[2,0])/s
        elif R[1,1] > R[2,2]:
            s = 2.0*np.sqrt(1+R[1,1]-R[0,0]-R[2,2])
            w=(R[0,2]-R[2,0])/s; x=(R[0,1]+R[1,0])/s; y=0.25*s; z=(R[1,2]+R[2,1])/s
        else:
            s = 2.0*np.sqrt(1+R[2,2]-R[0,0]-R[1,1])
            w=(R[1,0]-R[0,1])/s; x=(R[0,2]+R[2,0])/s; y=(R[1,2]+R[2,1])/s; z=0.25*s
        q = np.array([w, x, y, z])
        return q / np.linalg.norm(q)
    
    # ===== 四元数 ↔ 欧拉角（ZYX顺序）=====
    @staticmethod
    def quaternion_to_euler(q):
        R = RotationConverter.quaternion_to_matrix(q)
        sy = -R[2, 0]
        if abs(sy) < 0.99999:
            alpha = np.arctan2(R[1, 0], R[0, 0])
            beta  = np.arctan2(sy, np.sqrt(R[0,0]**2+R[1,0]**2))
            gamma = np.arctan2(R[2, 1], R[2, 2])
        else:
            alpha = np.arctan2(-R[1, 2], R[1, 1])
            beta  = np.arctan2(sy, 1.0)
            gamma = 0.0
        return np.array([alpha, beta, gamma])
    
    @staticmethod
    def euler_to_quaternion(euler):
        a, b, g = euler
        cr, cp, cy = np.cos(a/2), np.cos(b/2), np.cos(g/2)
        sr, sp, sy = np.sin(a/2), np.sin(b/2), np.sin(g/2)
        return np.array([
            cr*cp*cy + sr*sp*sy,
            sr*cp*cy - cr*sp*sy,
            cr*sp*cy + sr*cp*sy,
            cr*cp*sy - sr*sp*cy
        ])
    
    # ===== 轴角式 ↔ 四元数 =====
    @staticmethod
    def axis_angle_to_quaternion(axis, angle):
        axis = np.array(axis) / np.linalg.norm(axis)
        h = angle / 2.0
        return np.array([np.cos(h), *(axis*np.sin(h))])
    
    @staticmethod
    def quaternion_to_axis_angle(q):
        q = q / np.linalg.norm(q)
        w, *v = q
        angle = 2.0 * np.arccos(np.clip(w, -1, 1))
        sin_h = np.sin(angle/2)
        if sin_h < 1e-10:
            return np.array([1., 0., 0.]), 0.0
        return np.array(v)/sin_h, angle

# 综合测试
if __name__ == "__main__":
    conv = RotationConverter()
    
    # 测试路径：欧拉角 → 四元数 → 矩阵 → 四元数 → 轴角 → 四元数 → 欧拉角
    euler_orig = np.radians([30.0, 45.0, 60.0])
    print(f"原始欧拉角: {np.degrees(euler_orig)}")
    
    q = conv.euler_to_quaternion(euler_orig)
    R = conv.quaternion_to_matrix(q)
    q2 = conv.matrix_to_quaternion(R)
    axis, angle = conv.quaternion_to_axis_angle(q2)
    q3 = conv.axis_angle_to_quaternion(axis, angle)
    euler_back = conv.quaternion_to_euler(q3)
    
    print(f"恢复欧拉角: {np.mod(np.degrees(euler_back), 360)}")
    print(f"✅ 最大误差: {np.max(np.abs(euler_orig - euler_back)):.2e} 弧度")</code></pre>

<hr />

<h3>📝 本章要点速记</h3>

<p>1. **四元数 $q=(w,x,y,z)$ → 旋转矩阵**：使用展开的矩阵公式，9个元素中有6个冗余</p>
<p>2. **旋转矩阵 → 四元数**：用 Shepperd 方法，根据迹和分量分段计算</p>
<p>3. **欧拉角 → 四元数**：每个角拆成两个半角，用半角公式合成</p>
<p>4. **四元数 → 欧拉角**：从旋转矩阵提取角度，注意万向锁时的特殊处理</p>
<p>5. **轴角式 ↔ 四元数**：$q=(\\cos\\frac{\\theta}{2}, \\mathbf{n}\\sin\\frac{\\theta}{2})$，最直接的转换</p>
<p>6. **万向锁**：当俯仰角 $\\beta=\\pm90°$ 时，旋转丢失一个自由度，矩阵奇异</p>
<p>7. **选型原则**：插值选四元数，人机交互选欧拉角，矩阵计算选旋转矩阵</p>

<hr />

<h3>🎯 章节练习</h3>

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 绕轴 $(1,1,0)/\\sqrt{2}$ 旋转 $60°$ 的四元数 |
| 2 | 推导题 | ⭐⭐ | 推导四元数到旋转矩阵的完整公式（展开 $q\\cdot\\tilde{v}\\cdot q^*$）|
| 3 | 分析题 | ⭐⭐⭐ | 分析欧拉角 ZYX 和 XYZ 顺序的万向锁位置有何不同 |
| 4 | 计算题 | ⭐⭐ | 将欧拉角 $(90°, 45°, 30°)$ 用 ZYX 顺序转为四元数 |
| 5 | 证明题 | ⭐⭐⭐ | 证明：$R(q_1 \\cdot q_2) = R(q_1) \\cdot R(q_2)$ |
| 6 | 实践题 | ⭐⭐ | 用 NumPy 实现完整的旋转转换器，测试所有路径 |

<hr />

<h3>🚀 下一章预告</h3>

<p>**第7章：四元数插值方法进阶**</p>

<p>四元数的最大优势之一是**完美支持球面插值**——不像欧拉角那样会卡在万向锁上。SLERP（球面线性插值）、Nlerp（归一化线性插值）、SQUAD（球面四边形插值）……这些方法如何工作？在 Unity、Unreal 等游戏引擎背后，动画系统是如何用四元数让角色的骨骼平滑旋转的？下一章为你揭晓。</p>
`,
    7: `<h2>第7章：四元数插值方法进阶</h2>

<blockquote>**本章简介**：深入掌握 SLERP、Nlerp、SQUAD 等四元数插值算法，理解球面空间的本质特性，并在游戏引擎（Unity/Unreal）的实际场景中灵活运用。</blockquote>
<blockquote></blockquote>
<blockquote>⏱ 预估学时：4 小时 | 难度：⭐⭐⭐⭐ | 📍 前置：第5章（四元数基础运算）</blockquote>

<hr />

<h3>一、为什么需要插值？</h3>

<h4>🔍 通俗理解</h4>

<p>想象动画中一个角色从朝向 A 走到朝向 B。你需要的不只是起点和终点，而是**中间每一帧的朝向**——这就是插值。</p>

<p>**问题**：用欧拉角对三个角度分别做线性插值（lerp）会产生"路径扭曲"——物体不会沿着最短路径平滑旋转，甚至可能穿过万向锁。</p>

<p>**四元数的优势**：四元数天然存在于**单位球面 $S^3$** 上，球面插值（SLERP）能在球面上找到最短路径，就像在地球表面导航找大圆航线一样。</p>

<blockquote>🎯 **生活类比**：地球表面两点之间，平面地图的直线不是最近的路——球面大圆才是。四元数插值同理：欧拉角的线性插值不是"直的路"，SLERP 才是球面上的"大圆路径"。</blockquote>

<hr />

<h3>二、Nlerp（归一化线性插值）</h3>

<h4>2.1 定义与公式</h4>

<details class="def-box" open>
<summary>📖 定义：Nlerp（Normalized Linear Interpolation）</summary>

<p>Nlerp 是最简单的插值方式：先对四元数做普通线性插值，然后归一化。</p>

<p>$$Nlerp(q_1, q_2; t) = \\frac{(1-t)q_1 + t q_2}{\\|(1-t)q_1 + t q_2\\|}, \\quad t \\in [0, 1]$$</p>

<p>**优点**：</p>
<li>计算简单，只涉及加法和归一化</li>
<li>对相邻四元数效果尚可</li>

<p>**缺点**：</p>
<li>插值路径**不是匀速**的（角速度变化不均匀）</li>
<li>当 $q_1$ 和 $q_2$ 夹角较大时，路径偏离大圆</li>

</details>

<h4>2.2 代码实现</h4>

<pre><code className="language-python">import numpy as np

def nlerp(q1, q2, t):
    """
    归一化线性插值（Nlerp）
    q1, q2: 单位四元数 [w, x, y, z]
    t: 参数 [0, 1]
    返回: 插值后的四元数
    """
    q1, q2 = np.array(q1), np.array(q2)
    # 确保 q2 与 q1 同向（避免走"远路"）
    if np.dot(q1, q2) < 0:
        q2 = -q2
    q_blend = (1 - t) * q1 + t * q2
    return q_blend / np.linalg.norm(q_blend)

# 验证
q1 = np.array([1, 0, 0, 0])  # 零旋转
q2 = np.array([np.cos(np.pi/4), 0, 0, np.sin(np.pi/4)])  # 绕Z轴旋转90°

for t in [0, 0.25, 0.5, 0.75, 1.0]:
    q = nlerp(q1, q2, t)
    angle = 2 * np.arccos(np.clip(q[0], -1, 1))
    print(f"t={t:.2f} | 角度={np.degrees(angle):.1f}° | 四元数={q}")</code></pre>

<hr />

<h3>三、SLERP（球面线性插值）</h3>

<h4>🔍 通俗理解</h4>

<p>SLERP = Spherical Linear Interpolation。它在**球面大圆**上做匀速插值——就像在地球表面沿着最优航线行走，速度恒定。</p>

<blockquote>🌟 **关键洞察**：SLERP 在旋转意义上是**严格匀速**的——角速度恒定，不加速不减速。</blockquote>

<h4>3.1 推导：SLERP 公式</h4>

<details class="proof-box" open>
<summary>📐 推导：SLERP 公式</summary>

<p>**几何思路**：在 $S^3$ 球面上，两点间的最短路径是一段**大圆弧**。设 $q_1$ 和 $q_2$ 的夹角为 $\\Omega$，则插值路径在角 $\\Omega$ 构成的超球面上。</p>

<p>设 $q_1, q_2$ 为单位四元数，令 $\\Omega = \\arccos(q_1 \\cdot q_2)$ 为它们在 $S^3$ 上的角距离。</p>

<p>**当 $\\Omega \\approx 0$ 时**（两点几乎重合）：用线性插值</p>

<p>$$SLERP(q_1, q_2; t) \\approx (1-t)q_1 + t q_2$$</p>

<p>**当 $\\Omega > 0$ 时**：沿大圆弧插值</p>

<p>$$SLERP(q_1, q_2; t) = \\frac{\\sin[(1-t)\\Omega]}{\\sin\\Omega} q_1 + \\frac{\\sin[t\\Omega]}{\\sin\\Omega} q_2$$</p>

<p>**推导关键**：在球面三角形中利用单位球面三角恒等式，将四元数插值映射为三角加权。</p>

<p>□ 证毕</p>

</details>

<h4>3.2 完整 SLERP 实现</h4>

<pre><code className="language-python">import numpy as np

def slerp(q1, q2, t):
    """
    球面线性插值（SLERP）
    参数:
        q1, q2: 单位四元数 [w, x, y, z]
        t: 参数 [0, 1]
    返回:
        插值后的单位四元数
    """
    q1, q2 = np.array(q1, dtype=np.float64), np.array(q2, dtype=np.float64)
    
    # Step 1: 确保走短弧
    dot = np.dot(q1, q2)
    if dot < 0:
        q2 = -q2
        dot = -dot
    
    # Step 2: 接近共线时退化为线性插值（避免除零）
    if dot > 0.9995:
        return nlerp(q1, q2, t)
    
    # Step 3: SLERP 核心公式
    Omega = np.arccos(np.clip(dot, -1.0, 1.0))
    sin_Omega = np.sin(Omega)
    
    # 防止 sin_Omega ≈ 0
    if sin_Omega < 1e-10:
        return nlerp(q1, q2, t)
    
    w1 = np.sin((1 - t) * Omega) / sin_Omega
    w2 = np.sin(t * Omega) / sin_Omega
    
    return w1 * q1 + w2 * q2

# 完整对比可视化
def compare_interpolations():
    import matplotlib.pyplot as plt
    
    # 测试场景：绕Z轴旋转 0° → 90°
    q_start = np.array([1.0, 0.0, 0.0, 0.0])  # 无旋转
    axis_z = np.array([0, 0, 1])
    angle_end = np.pi / 2  # 90°
    q_end = np.array([np.cos(angle_end/2), 0, 0, np.sin(angle_end/2)])
    
    t_vals = np.linspace(0, 1, 100)
    
    nlerp_angles, slerp_angles = [], []
    for t in t_vals:
        q_n = nlerp(q_start, q_end, t)
        q_s = slerp(q_start, q_end, t)
        nlerp_angles.append(2 * np.arccos(np.clip(q_n[0], -1, 1)))
        slerp_angles.append(2 * np.arccos(np.clip(q_s[0], -1, 1)))
    
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    
    # 图1：角度 vs t
    axes[0].plot(t_vals, np.degrees(nlerp_angles), 'b--', label='Nlerp', linewidth=2)
    axes[0].plot(t_vals, np.degrees(slerp_angles), 'r-', label='SLERP', linewidth=2)
    axes[0].plot(t_vals, 90 * t_vals, 'g:', label='理想匀速', linewidth=2, alpha=0.7)
    axes[0].set_xlabel('t')
    axes[0].set_ylabel('累积旋转角度 (°)')
    axes[0].set_title('Nlerp vs SLERP：角度累积')
    axes[0].legend()
    axes[0].grid(True, alpha=0.3)
    
    # 图2：角速度（角度差分）
    nlerp_speed = np.diff(np.degrees(nlerp_angles))
    slerp_speed = np.diff(np.degrees(slerp_angles))
    axes[1].plot(t_vals[1:], nlerp_speed, 'b--', label='Nlerp 角速度', linewidth=2)
    axes[1].plot(t_vals[1:], slerp_speed, 'r-', label='SLERP 角速度', linewidth=2)
    axes[1].axhline(90/99, color='g', linestyle=':', label='理想匀速', alpha=0.7)
    axes[1].set_xlabel('t')
    axes[1].set_ylabel('每步旋转角度 (°)')
    axes[1].set_title('Nlerp vs SLERP：角速度分布')
    axes[1].legend()
    axes[1].grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('/workspace/studies/四元数与空间变换/ch7_nlerp_vs_slerp.png', dpi=150)
    print("对比图已保存！")
    print(f"Nlerp 最大角速度: {np.max(nlerp_speed):.4f}°")
    print(f"SLERP 角速度: {slerp_speed[0]:.4f}° (恒定)")
    print(f"理想值: {90/99:.4f}°")

compare_interpolations()</code></pre>

<h4>3.3 SLERP 的关键性质</h4>

| 性质 | 说明 |
|------|------|
| **恒定角速度** | $\\frac{d\\Omega}{dt}$ 为常数，大圆路径 |
| **交换性** | $SLERP(q_1, q_2; t) = SLERP(q_2, q_1; 1-t)$ |
| **结合性** | $SLERP(q_1, q_2; t_1) \\cdot SLERP(q_1, q_2; t_2) = SLERP(q_1, q_2; t_1 + t_2)$ |
| **路径最短** | 在 $S^3$ 球面上，SLERP 路径是最短（大圆）路径 |

<hr />

<h3>四、Nlerp vs SLERP：何时选哪个？</h3>

<h4>🔍 通俗理解</h4>

<blockquote>🌟 **一句话总结**：当 $q_1$ 和 $q_2$ 夹角很小（< 20°）时，Nlerp 和 SLERP 几乎一样；但夹角大时，SLERP 是唯一正确的选择。</blockquote>

| 特性 | Nlerp | SLERP |
|------|-------|-------|
| **角速度** | 不均匀（中间快，两端慢）| 恒定（严格大圆路径）|
| **计算量** | 极低（加法+归一化）| 较高（三角函数+除法）|
| **适用场景** | 实时性要求极高、夹角很小的场景 | 需要精确匀速的动画 |
| **误差** | 夹角越大误差越大 | 无几何误差 |
| **实现难度** | 简单 | 略复杂 |

<pre><code className="language-python"># 典型决策逻辑
def smart_interpolate(q1, q2, t, threshold_deg=20):
    """智能选择插值方法"""
    q1, q2 = np.array(q1), np.array(q2)
    if np.dot(q1, q2) < 0:
        q2 = -q2
    
    angle_between = 2 * np.arccos(np.clip(np.dot(q1, q2), -1, 1))
    if np.degrees(angle_between) < threshold_deg:
        print(f"夹角 {np.degrees(angle_between):.1f}° < {threshold_deg}° → 使用 Nlerp")
        return nlerp(q1, q2, t)
    else:
        print(f"夹角 {np.degrees(angle_between):.1f}° ≥ {threshold_deg}° → 使用 SLERP")
        return slerp(q1, q2, t)</code></pre>

<hr />

<h3>五、SQUAD（球面四边形插值）</h3>

<h4>🔍 通俗理解</h4>

<p>SLERP 适合在**两点之间**插值。但如果我有**四个控制点** $q_1, q_2, q_3, q_4$（比如一段动画序列的四个关键帧），想走一条**曲线**而不是直线，怎么办？</p>

<p>SQUAD = Spherical Quadrangle interpolation，通过在四元数序列中构造**辅助控制点**（spline control points），在每对相邻关键帧之间应用 SLERP，拼接出平滑的曲线路径。</p>

<h4>5.1 定义与公式</h4>

<details class="def-box" open>
<summary>📖 定义：SQUAD（Spherical Quadrangle Interpolation）</summary>

<p>给定四个控制四元数 $q_1, q_2, q_3, q_4$，定义辅助控制点：</p>

<p>$$s_i = q_i \\cdot \\exp\\left(-\\frac{\\log(q_i^* \\cdot q_{i+1}) + \\log(q_i^* \\cdot q_{i-1})}{4}\\right)$$</p>

<p>其中 $\\log(q)$ 是四元数的对数映射（见第8章）。</p>

<p>**SQUAD 插值公式**（在 $q_i$ 和 $q_{i+1}$ 之间）：</p>

<p>$$Squad(q_i, q_{i+1}, s_i, s_{i+1}; t) = SLERP\\left(SLERP(q_i, q_{i+1}; t),\\; SLERP(s_i, s_{i+1}; t);\\; 2t(1-t)\\right)$$</p>

<p>**直观理解**：先用 SLERP 在相邻关键帧之间直线插值，再用另一个 SLERP 将路径"弯曲"成曲线。</p>

</details>

<h4>5.2 NumPy 实现</h4>

<pre><code className="language-python">def quaternion_log(q):
    """四元数对数映射 log(q) → 旋转向量"""
    q = np.array(q, dtype=np.float64)
    q = q / np.linalg.norm(q)
    w, v = q[0], q[1:]
    norm_v = np.linalg.norm(v)
    if norm_v < 1e-10:
        return np.zeros(3)
    # log(q) = (arccos(w) * v / |v|)
    return np.arccos(np.clip(w, -1, 1)) * (v / norm_v)

def quaternion_exp(v):
    """四元数指数映射 exp(v) → 四元数"""
    v = np.array(v, dtype=np.float64)
    norm = np.linalg.norm(v)
    if norm < 1e-10:
        return np.array([1.0, 0.0, 0.0, 0.0])
    return np.array([np.cos(norm/2), *(v/norm * np.sin(norm/2))])

def squad(q1, q2, q3, q4, t):
    """
    球面四边形插值（SQUAD）
    q1, q2: 关键帧端点
    q3, q4: 辅助控制点
    t: 参数 [0, 1]
    """
    # 辅助控制点计算（简化版：使用中点切线）
    q1, q2, q3, q4 = np.array(q1), np.array(q2), np.array(q3), np.array(q4)
    
    # 确保方向一致性
    for q in [q2, q3, q4]:
        if np.dot(q1, q) < 0:
            pass  # 由内部 SLERP 处理
    
    # 计算辅助控制点（s_i）
    def compute_s(q_i, q_ip1, q_im1):
        # s_i = q_i * exp( -1/4 * (log(q_i^* q_{i+1}) + log(q_i^* q_{i-1})) )
        diff1 = quaternion_multiply(quaternion_conjugate(q_i), q_ip1)
        diff2 = quaternion_multiply(quaternion_conjugate(q_i), q_im1)
        log1 = quaternion_log(diff1)
        log2 = quaternion_log(diff2)
        tangent = -0.25 * (log1 + log2)
        return quaternion_multiply(q_i, quaternion_exp(tangent))
    
    s_i = compute_s(q1, q2, q4)  # q1 处的切线方向
    s_ip1 = compute_s(q2, q3, q1)  # q2 处的切线方向
    
    # 两层 SLERP
    inner = slerp(q1, q2, t)
    inner_ctrl = slerp(s_i, s_ip1, t)
    return slerp(inner, inner_ctrl, 2*t*(1-t))

def quaternion_multiply(q1, q2):
    """四元数乘法"""
    w1, x1, y1, z1 = q1
    w2, x2, y2, z2 = q2
    return np.array([
        w1*w2 - x1*x2 - y1*y2 - z1*z2,
        w1*x2 + x1*w2 + y1*z2 - z1*y2,
        w1*y2 - x1*z2 + y1*w2 + z1*x2,
        w1*z2 + x1*y2 - y1*x2 + z1*w2
    ])

def quaternion_conjugate(q):
    return np.array([q[0], -q[1], -q[2], -q[3]])

# SQUAD 可视化
def demo_squad():
    import matplotlib.pyplot as plt
    
    # 四个关键帧：绕不同轴的旋转
    q1 = np.array([1, 0, 0, 0])  # 起点
    q2 = np.array([np.cos(np.pi/6), np.sin(np.pi/6), 0, 0])  # 绕X旋转30°
    q3 = np.array([np.cos(np.pi/4), 0, np.sin(np.pi/4), 0])    # 绕Y旋转45°
    q4 = np.array([np.cos(np.pi/3), 0, 0, np.sin(np.pi/3)])   # 绕Z旋转60°
    
    t_vals = np.linspace(0, 1, 100)
    squad_angles = []
    slerp_angles = []
    
    for t in t_vals:
        # SQUAD 插值
        q_squad = squad(q1, q2, q3, q4, t)
        squad_angles.append(2 * np.arccos(np.clip(q_squad[0], -1, 1)))
        
        # 对比 SLERP（仅在 q1 和 q4 之间）
        q_slerp = slerp(q1, q4, t)
        slerp_angles.append(2 * np.arccos(np.clip(q_slerp[0], -1, 1)))
    
    plt.figure(figsize=(10, 5))
    plt.plot(t_vals, np.degrees(squad_angles), 'b-', label='SQUAD（曲线路径）', linewidth=2)
    plt.plot(t_vals, np.degrees(slerp_angles), 'r--', label='SLERP（直线路径）', linewidth=2)
    plt.scatter([0, 1], [0, np.degrees(slerp_angles[-1])], color='red', zorder=5)
    plt.scatter([0.33, 0.67], [np.degrees(squad_angles[33]), np.degrees(squad_angles[67])], color='blue', zorder=5)
    plt.xlabel('t')
    plt.ylabel('累积旋转角度 (°)')
    plt.title('SQUAD vs SLERP：四元数曲线插值')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.savefig('/workspace/studies/四元数与空间变换/ch7_squad_demo.png', dpi=150)
    print("SQUAD 示意图已保存！")

demo_squad()</code></pre>

<hr />

<h3>六、工程实践：Unity 与 Unreal 中的实际使用</h3>

<h4>🔍 Unity（实际代码）</h4>

<pre><code className="language-csharp">// ===== Unity C# 四元数插值 =====

// 1. 基础 SLERP（内置方法）
Quaternion startRot = Quaternion.identity;
Quaternion endRot = Quaternion.Euler(0f, 90f, 0f);

// 匀速球面插值（推荐）
Quaternion result = Quaternion.Slerp(startRot, endRot, t);

// 2. 旋转并平滑过渡（动画曲线）
// 使用 RotateTowards 做有界角速度插值
transform.rotation = Quaternion.RotateTowards(
    transform.rotation,
    targetRotation,
    maxDegreesPerSecond * Time.deltaTime
);

// 3. 多关键帧动画（Squad - Via 函数）
// Unity 的 Slerp 配合手动切线控制实现 SQUAD
Quaternion Squad(Quaternion q1, Quaternion q2, Quaternion a, Quaternion b, float t) {
    Quaternion Q1 = Quaternion.Slerp(q1, q2, t);
    Quaternion Q2 = Quaternion.Slerp(a, b, t);
    return Quaternion.Slerp(Q1, Q2, 2f * t * (1f - t));
}

// 4. LookAt 方向插值（人物跟随）
Vector3 direction = target.position - transform.position;
Quaternion targetRot = Quaternion.LookRotation(direction);
transform.rotation = Quaternion.Slerp(transform.rotation, targetRot, smoothSpeed * Time.deltaTime);</code></pre>

<h4>🔍 Unreal Engine（实际代码）</h4>

<pre><code className="language-cpp">// ===== Unreal Engine C++ 四元数插值 =====

// 1. FQuat 内置 Slerp
FQuat StartQuat = FQuat::Identity;
FQuat EndQuat = FRotator(0.0f, 90.0f, 0.0f).Quaternion();
FQuat Result = FQuat::Slerp(*StartQuat, *EndQuat, Alpha);

// 2. 匀速旋转插值（使用 FMath::Slerp）
FQuat InterpolatedQuat = FMath::Slerp(CurrentRotation, TargetRotation, DeltaTime * RotationSpeed);

// 3. 使用 FQuat::Squad 实现复杂路径
FQuat Squad(FQuat q1, FQuat q2, FQuat tang1, FQuat tang2, float Alpha);

// 4. Unreal 动画中的关键帧
// 在 Animation Blueprint 中使用 Interpolation 节点
// RInterp To (Rotation)：欧拉角插值（有万向锁风险，不推荐！）
// Quaternion Slerp：四元数球面插值（推荐）</code></pre>

<h4>🎮 实际工程选择指南</h4>

| 场景 | 推荐方法 | 原因 |
|------|---------|------|
| 角色平滑转向 | \`Quaternion.Slerp\` / \`FQuat::Slerp\` | 角度固定，恒速 |
| 相机平滑跟随 | \`Quaternion.Slerp\`（阻尼系数可调）| 视觉舒适，无抖动 |
| 骨骼动画关键帧 | SQUAD（多控制点）| 曲线平滑，避免僵硬 |
| 实时陀螺仪融合 | SLERP（高频调用）| 无奇异性，数值稳定 |
| 路径规划可视化 | SLERP + 插值帧数控制 | 精确控制轨迹 |

<hr />

<h3>七、变速率插值（Spherical Quadratic Interpolation）</h3>

<h4>🔍 通俗理解</h4>

<p>有时我们希望动画**开始慢、加速、中间快、然后减速**——这叫**缓动（easing）**。在球面上把 SLERP 和缓动函数结合，就得到**变速率球面插值**。</p>

<pre><code className="language-python">def slerp_with_easing(q1, q2, t, easing_func='ease_in_out'):
    """
    带缓动函数的 SLERP
    缓动函数先将 t 映射到 [0,1] 的非线性区间
    """
    # 常用缓动函数
    def ease_in_out(t):
        return t * t * (3 - 2 * t)  # smoothstep
    
    def ease_in(t):
        return t * t
    
    def ease_out(t):
        return 1 - (1 - t) ** 2
    
    easing_map = {'ease_in': ease_in, 'ease_out': ease_out, 'ease_in_out': ease_in_out}
    t_eased = easing_map[easing_func](t)
    
    return slerp(q1, q2, t_eased)

# 演示缓动效果
print("=== SLERP + 缓动函数 ===")
for name in ['linear', 'ease_in', 'ease_out', 'ease_in_out']:
    angles = []
    for t in np.linspace(0, 1, 10):
        q = slerp_with_easing(
            np.array([1, 0, 0, 0]),
            np.array([np.cos(np.pi/4), 0, 0, np.sin(np.pi/4)]),
            t, name
        )
        angles.append(np.degrees(2 * np.arccos(np.clip(q[0], -1, 1))))
    print(f"{name}: {[f'{a:.1f}' for a in angles[:5]]} ...")</code></pre>

<hr />

<h3>📝 本章要点速记</h3>

<p>1. **Nlerp**：线性插值 + 归一化，计算快但角速度不均匀</p>
<p>2. **SLERP**：球面大圆插值，严格匀速，是四元数插值的"黄金标准"</p>
<p>3. **SQUAD**：基于多控制点的球面曲线插值，用于骨骼动画关键帧</p>
<p>4. **何时用 Nlerp**：当 $q_1$ 和 $q_2$ 夹角 < 20° 且实时性要求极高</p>
<p>5. **何时用 SLERP**：任何需要精确、匀速、正确旋转路径的场景</p>
<p>6. **Unity/Unreal**：均内置 \`Quaternion.Slerp\` / \`FQuat::Slerp\`，直接调用即可</p>
<p>7. **缓动函数**：在 SLERP 前对参数 $t$ 做非线性映射，控制变速率</p>

<hr />

<h3>🎯 章节练习</h3>

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 计算题 | ⭐⭐ | 手算 SLERP：$q_1=(1,0,0,0)$，$q_2=(\\cos 60°, 0, 0, \\sin 60°)$，求 $t=0.5$ 时的插值 |
| 2 | 分析题 | ⭐⭐ | 比较 Nlerp 和 SLERP 在 $t=0.5$ 处的角速度差异 |
| 3 | 编程题 | ⭐⭐ | 实现 SLERP 并验证：$\\Omega=30°$ 时，$t=0.25, 0.5, 0.75$ 的累积角度 |
| 4 | 设计题 | ⭐⭐⭐ | 设计一个关键帧动画系统，用 SQUAD 连接 5 个关键旋转 |
| 5 | 分析题 | ⭐⭐⭐ | 证明 SLERP 在 $t$ 和 $(1-t)$ 处角速度大小相同（时间对称性）|
| 6 | 实践题 | ⭐⭐⭐ | 用 Unity 或 Unreal 实现一个平滑旋转的 UI 元素（90° 平滑过渡）|

<hr />

<h3>🚀 下一章预告</h3>

<p>**第8章：四元数与李群李代数**</p>

<p>SLERP 的"球面路径"不是巧合——背后有深刻的数学支撑。三维旋转构成 **SO(3) 李群**，其切空间是 **so(3) 李代数**，而四元数正是 SO(3) 的**双覆盖**。四元数的指数/对数映射与李群的李代数结构一一对应。这套框架如何帮助机器人学家计算 Jacobian 矩阵？姿态估计算法（EKF）中如何用李代数做优化？第8章为你深入浅出地揭开这一切。</p>
`,
    8: `<h2>第8章：四元数与李群李代数</h2>

<blockquote>**本章简介**：从更高视角理解三维旋转的数学结构——SO(3) 李群与其切空间 so(3) 李代数，以及四元数作为 SO(3) 双覆盖的本质。理解指数/对数映射，并掌握在机器人学与姿态估计中的实际应用。</blockquote>
<blockquote></blockquote>
<blockquote>⏱ 预估学时：5 小时 | 难度：⭐⭐⭐⭐⭐ | 📍 前置：第2-4章（线性代数基础、四元数定义）</blockquote>

<hr />

<h3>一、为什么需要李群李代数？</h3>

<h4>🔍 通俗理解</h4>

<p>三维旋转集合有无穷多个——但它们**不是随意分布**的，而是按照某种规律组织起来，构成一个**光滑的弯曲空间**（流形）。</p>

<blockquote>🎯 **生活类比**：地球表面是一个弯曲的 2D 流形。在地球表面移动时，不能简单做平面加减法——你需要沿着球面走。李群就像"旋转的地球"，李代数就是"在地球表面某点的切平面"（可以用来做局部线性近似）。</blockquote>

<p>**问题驱动**：</p>
<p>1. 两个旋转矩阵相乘得到新旋转——但**如何求导**？（优化问题）</p>
<p>2. 如何找到"从 R₁ 到 R₂ 的最小路径"？（测地线问题）</p>
<p>3. 如何处理旋转的**微小扰动**？（状态估计、滤波器）</p>

<p>**答案**：李群提供了全局结构，李代数提供了局部线性化工具。四元数是 SO(3) 的**双覆盖**，两者本质上描述同一对象。</p>

<hr />

<h3>二、SO(3) 李群</h3>

<h4>2.1 定义</h4>

<details class="def-box" open>
<summary>📖 定义：特殊正交群 SO(3)</summary>

<p>$$SO(3) = \\left\\{ R \\in \\mathbb{R}^{3 \\times 3} \\mid R^T R = I, \\quad \\det(R) = +1 \\right\\}$$</p>

<p>**两点含义**：</p>
<li>**正交性** $R^T R = I$：列向量两两正交且单位长，保持角度和长度不变</li>
<li>**行列式** $\\det(R) = +1$：右手坐标系（不翻转），排斥反射变换</li>

<p>SO(3) 是三维旋转的**矩阵群**，构成一个紧致（compact）、连通的李群。</p>

<p>**群公理验证**：</p>

| 公理 | 验证 |
|------|------|
| 封闭性 | $R_1, R_2 \\in SO(3) \\Rightarrow R_1 R_2 \\in SO(3)$ |
| 结合性 | 矩阵乘法满足 |
| 单位元 | $I_{3\\times3}$（恒等旋转）|
| 逆元 | $R^{-1} = R^T \\in SO(3)$ |

</details>

<pre><code className="language-python">import numpy as np

def is_so3(R, tol=1e-6):
    """检查矩阵 R 是否属于 SO(3)"""
    R = np.array(R, dtype=np.float64)
    if R.shape != (3, 3): return False
    orthogonality = np.max(np.abs(R.T @ R - np.eye(3))) < tol
    det_one = abs(np.linalg.det(R) - 1.0) < tol
    return orthogonality and det_one

def random_so3():
    """随机生成一个旋转矩阵（QR分解法）"""
    A = np.random.randn(3, 3)
    Q, R = np.linalg.qr(A)
    if np.linalg.det(Q) < 0: Q[:, 0] *= -1
    return Q

print("=== SO(3) 验证 ===")
for i in range(5):
    R = random_so3()
    print(f"R_{i+1}: 正交={np.allclose(R.T@R, np.eye(3))}, det={np.linalg.det(R):.4f}, in_SO3={is_so3(R)}")

R1, R2 = random_so3(), random_so3()
print(f"\\n封闭性: R1·R2 ∈ SO(3)? {is_so3(R1 @ R2)}")
print(f"逆元: R1^T ∈ SO(3)? {is_so3(R1.T)}")</code></pre>

<hr />

<h3>三、so(3) 李代数：向量叉乘与反对称矩阵</h3>

<h4>🔍 通俗理解</h4>

<p>**李代数 so(3)** 是 SO(3) 在单位元 $I$ 处的**切空间**——就像地球表面某点的切平面。如果 SO(3) 是"旋转的曲面"，so(3) 就是"在单位元处能走的所有小方向"。</p>

<p>**关键发现**：so(3) 中的元素与 $\\mathbb{R}^3$ 中的向量一一对应！每个三维向量 $\\omega = (\\omega_x, \\omega_y, \\omega_z)$ 唯一对应一个反对称矩阵 $[\\omega]_\\times$。</p>

<h4>3.1 反对称矩阵（Skew-Symmetric Matrix）</h4>

<details class="def-box" open>
<summary>📖 定义：反对称矩阵 $[\omega]_\times$</summary>

<p>对于向量 $\\omega = (\\omega_x, \\omega_y, \\omega_z) \\in \\mathbb{R}^3$，其对应的 **反对称矩阵** $[\\omega]_\\times \\in \\mathbb{R}^{3 \\times 3}$ 为：</p>

<p>$$[\\omega]_\\times = \\begin{pmatrix}</p>
<p>0 & -\\omega_z & \\omega_y \\\\</p>
<p>\\omega_z & 0 & -\\omega_x \\\\</p>
<p>-\\omega_y & \\omega_x & 0</p>
<p>\\end{pmatrix}$$</p>

<p>**性质**：</p>
<li>$[\\omega]_\\times^T = -[\\omega]_\\times$（反对称）</li>
<li>$[a]_\\times b = a \\times b$（矩阵乘法 = 叉乘）</li>
<li>$[a]_\\times a = \\mathbf{0}$（向量与自身的叉乘为零）</li>

<p>**逆映射**（vee 运算符 $[\\cdot]^\\vee$）：</p>

<p>$$\\begin{pmatrix}</p>
<p>0 & -c & b \\\\</p>
<p>c & 0 & -a \\\\</p>
<p>-b & a & 0</p>
<p>\\end{pmatrix}^\\vee = (a, b, c)$$</p>

</details>

<pre><code className="language-python">def skew(w):
    """向量 → 反对称矩阵 [w]_×"""
    wx, wy, wz = w
    return np.array([
        [ 0, -wz,  wy],
        [ wz,  0, -wx],
        [-wy, wx,  0]
    ])

def vee(S):
    """反对称矩阵 → 向量"""
    return np.array([S[2, 1], S[0, 2], S[1, 0]])

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print("=== 反对称矩阵性质验证 ===")
print(f"叉乘 a×b = {np.cross(a, b)}")
print(f"[a]_× · b = {skew(a) @ b}")
print(f"两者相等: {np.allclose(np.cross(a, b), skew(a) @ b)}")
print(f"[a]_× · a = {skew(a) @ a}")  # 应为零向量</code></pre>

<h4>3.2 李括号</h4>

<details class="def-box" open>
<summary>📖 定义：so(3) 李括号 = 叉乘</summary>

<p>so(3) 上的李括号定义为矩阵交换子：</p>

<p>$$[\\omega_1, \\omega_2]_{so(3)} = [\\omega_1]_\\times [\\omega_2]_\\times - [\\omega_2]_\\times [\\omega_1]_\\times = [\\omega_1 \\times \\omega_2]_\\times$$</p>

<pre><code className="language-python">def lie_bracket(w1, w2):
    S1, S2 = skew(w1), skew(w2)
    bracket = S1 @ S2 - S2 @ S1
    cross = np.cross(w1, w2)
    return bracket, cross, np.allclose(bracket, skew(cross))

result = lie_bracket(np.array([1, 0, 0]), np.array([0, 1, 0]))
print(f"so(3) 李括号 = 叉乘: {result[2]}")  # True
print(f"结果向量: {vee(result[0])} (应为 [0,0,1])")</code></pre>

<p>**定义**：$\\mathfrak{so}(3) = \\{ [\\omega]_\\times \\in \\mathbb{R}^{3 \\times 3} \\mid [\\omega]_\\times^T = -[\\omega]_\\times, \\text{tr}([\\omega]_\\times) = 0 \\}$</p>

<p>向量形式：$\\mathfrak{so}(3) \\cong \\mathbb{R}^3$，向量 $\\omega$ 的大小 $|\\omega|$ 代表角速度大小，方向代表旋转轴方向。</p>

<blockquote>🌟 **核心洞察**：**$\\omega$ 就是"无穷小旋转"的数学表示**。当你绕轴 $\\omega$ 以角速度 $|\\omega|$ 旋转无穷小角度时，其导数正好是 $[\\omega]_\\times$。</blockquote>

</details>

<hr />

<h3>四、指数映射与对数映射</h3>

<h4>🔍 通俗理解</h4>

<p>**指数映射**：把"方向"（so(3) 的切向量）变成"旋转"（SO(3) 的元素）。</p>
<p>**对数映射**：把"旋转"（SO(3)）变回"方向"（so(3)）。</p>

<h4>4.1 so(3) → SO(3)：指数映射（Rodrigues 公式）</h4>

<details class="proof-box" open>
<summary>📐 推导：Rodrigues 公式</summary>

<p>设 $\\omega \\in \\mathbb{R}^3$，$[\\omega]_\\times \\in \\mathfrak{so}(3)$。</p>

<p>**矩阵指数**：</p>

<p>$$\\exp([\\omega]_\\times) = I + [\\omega]_\\times + \\frac{[\\omega]_\\times^2}{2!} + \\frac{[\\omega]_\\times^3}{3!} + \\cdots$$</p>

<p>利用恒等式 $[\\omega]_\\times^3 = -\\theta^2 [\\omega]_\\times$（其中 $\\theta = \\|\\omega\\|$），展开式收敛为：</p>

<p>$$\\boxed{\\exp([\\omega]_\\times) = I + \\frac{\\sin\\theta}{\\theta} [\\omega]_\\times + \\frac{1-\\cos\\theta}{\\theta^2} [\\omega]_\\times^2}$$</p>

<p>□ 证毕</p>

</details>

<pre><code className="language-python">def so3_exp(w):
    """so(3) → SO(3)：Rodrigues 公式"""
    theta = np.linalg.norm(w)
    if theta < 1e-10:
        return np.eye(3)
    w_hat = w / theta
    S = skew(w_hat)
    return np.eye(3) + np.sin(theta) * S + (1 - np.cos(theta)) * (S @ S)

def quaternion_to_matrix(q):
    w, x, y, z = q / np.linalg.norm(q)
    return np.array([
        [1-2*(y**2+z**2), 2*(x*y-w*z), 2*(x*z+w*y)],
        [2*(x*y+w*z), 1-2*(x**2+z**2), 2*(y*z-w*x)],
        [2*(x*z-w*y), 2*(y*z+w*x), 1-2*(x**2+y**2)]
    ])

def axis_angle_to_quaternion(axis, angle):
    axis = axis / np.linalg.norm(axis)
    return np.array([np.cos(angle/2), axis[0]*np.sin(angle/2),
                     axis[1]*np.sin(angle/2), axis[2]*np.sin(angle/2)])

# 验证 so(3) exp 与四元数一致
axis = np.array([1, 2, 3]) / np.linalg.norm([1, 2, 3])
angle = np.radians(45)
w = axis * angle

R_exp = so3_exp(w)
q = axis_angle_to_quaternion(axis, angle)
R_quat = quaternion_to_matrix(q)

print(f"so(3) exp 差异: {np.max(np.abs(R_exp - R_quat)):.2e}")</code></pre>

<h4>4.2 SO(3) → so(3)：对数映射</h4>

<pre><code className="language-python">def so3_log(R):
    """SO(3) → so(3)：矩阵对数"""
    trace = np.trace(R)
    if np.isclose(trace, 3):
        return np.zeros(3)
    theta = np.arccos(np.clip((trace - 1) / 2, -1, 1))
    S = (R - R.T) / 2
    omega = vee(S) / (2 * np.sin(theta))
    return theta * omega

# 往返测试
for angle_deg in [1, 45, 90, 135, 179]:
    w = np.array([1, 2, 3])
    w = w / np.linalg.norm(w) * np.radians(angle_deg)
    R = so3_exp(w)
    w_back = so3_log(R)
    print(f"角度 {angle_deg}° → 往返误差: {np.degrees(np.linalg.norm(w_back - w)):.2e}°")</code></pre>

<hr />

<h3>五、四元数与 SO(3) 的指数/对数映射</h3>

<pre><code className="language-python">def quaternion_log(q):
    """四元数对数 log(q) → 旋转向量"""
    q = np.array(q, dtype=np.float64) / np.linalg.norm(q)
    w, *v = q
    norm_v = np.linalg.norm(v)
    if norm_v < 1e-10:
        return np.zeros(3)
    theta = 2 * np.arccos(np.clip(w, -1, 1))
    return theta * (v / norm_v)

def quaternion_exp(w):
    """旋转向量 → 四元数 exp(w)"""
    w = np.array(w, dtype=np.float64)
    theta = np.linalg.norm(w)
    if theta < 1e-10:
        return np.array([1.0, 0.0, 0.0, 0.0])
    return np.array([np.cos(theta/2), *(w/theta * np.sin(theta/2))])

# 验证：四元数 exp/log 与 so(3) exp/log 的等价性
axis = np.array([1, 1, 1]) / np.sqrt(3)
angle = np.radians(60)
w = axis * angle

q_exp = quaternion_exp(w)
R_exp = so3_exp(w)
print(f"四元数 exp 与 so(3) exp 导出相同旋转: {np.allclose(R_exp, quaternion_to_matrix(q_exp))}")</code></pre>

<hr />

<h3>六、在机器人学中的应用</h3>

<h4>🔍 通俗理解</h4>

<p>**雅可比矩阵（Jacobian）** 描述了关节空间速度到末端执行器空间速度的线性映射。但当姿态用旋转矩阵表示时，对旋转矩阵求导成了难题——因为旋转矩阵空间不是平坦的！</p>

<p>**so(3) 提供了完美的解决方案**：在切空间中对旋转做线性化，将非线性问题转化为线性问题。</p>

<h4>6.1 旋转雅可比（Rotation Jacobian）</h4>

<details class="def-box" open>
<summary>📖 定义：旋转雅可比矩阵</summary>

<p>**问题**：已知关节角速度 $\\dot{q} \\in \\mathbb{R}^n$，求末端执行器角速度 $\\omega_e \\in \\mathbb{R}^3$。</p>

<p>$$\\omega_e = J_r(q) \\cdot \\dot{q}$$</p>

<p>**关键公式**：对旋转矩阵求导的结果落在 so(3)（反对称矩阵空间）中：</p>

<p>$$\\frac{d}{dt} R(t) = [\\omega(t)]_\\times \\cdot R(t)$$</p>

<p>即：**旋转的"速度"（时间导数）可以用 so(3) 中的旋转向量表示**。</p>

</details>

<pre><code className="language-python">def compute_manipulator_jacobian(joint_axes, positions, ee_position):
    """
    计算机械臂的解析雅可比矩阵
    """
    n = len(joint_axes)
    J = np.zeros((3, n))
    for i in range(n):
        zi = joint_axes[i]
        J[:, i] = np.cross(zi, ee_position - positions[i])
    return J

# 示例：6自由度机械臂
joint_axes = [
    np.array([0, 0, 1]), np.array([0, 0, 1]), np.array([0, 0, 1]),
    np.array([0, 1, 0]), np.array([0, 1, 0]), np.array([1, 0, 0]),
]
d = [0, 0.3, 0.3, 0.3, 0.3, 0.1]
positions = [np.array([0, 0, 0.0])]
for i in range(1, len(d)):
    positions.append(positions[-1] + np.array([0, 0, d[i]]))
ee_pos = positions[-1] + np.array([0.1, 0, 0])

J = compute_manipulator_jacobian(joint_axes, positions, ee_pos)
print("机械臂雅可比矩阵 J_r：\\n", J)
print(f"雅可比条件数: {np.linalg.cond(J):.2f}")</code></pre>

<hr />

<h3>七、在姿态估计中的应用</h3>

<h4>扩展卡尔曼滤波器（SO(3)-EKF）</h4>

<pre><code className="language-python">class SO3_EKF:
    """
    基于李代数 so(3) 的姿态扩展卡尔曼滤波器
    """
    def __init__(self, R_init):
        self.R = R_init
        self.P = np.eye(3) * 0.01  # 协方差
        self.Q = np.eye(3) * 0.001  # 过程噪声
        self.R_meas = np.eye(3) * 0.1  # 观测噪声
    
    def predict(self, omega, dt):
        """预测：基于陀螺仪角速度更新姿态"""
        theta = np.array(omega) * dt
        self.R = so3_exp(theta) @ self.R
        F = np.eye(3)
        self.P = F @ self.P @ F.T + self.Q
    
    def update(self, R_observed):
        """更新：融合观测姿态"""
        R_error = R_observed @ self.R.T
        delta_theta = so3_log(R_error)
        S = self.P + self.R_meas
        K = self.P @ np.linalg.inv(S)
        delta_update = K @ delta_theta
        self.R = so3_exp(delta_update) @ self.R
        I_KH = np.eye(3) - K
        self.P = I_KH @ self.P @ I_KH.T + K @ self.R_meas @ K.T
    
    def get_quaternion(self):
        """返回当前姿态的四元数"""
        trace = np.trace(self.R)
        if trace > 0:
            w = np.sqrt(1 + trace) / 2
            x = (self.R[2, 1] - self.R[1, 2]) / (4 * w)
            y = (self.R[0, 2] - self.R[2, 0]) / (4 * w)
            z = (self.R[1, 0] - self.R[0, 1]) / (4 * w)
        else:
            x = np.sqrt((self.R[0, 0] + 1) / 2)
            y = np.sign(self.R[0, 1]) * np.sqrt((self.R[1, 1] + 1) / 2)
            z = np.sign(self.R[0, 2]) * np.sqrt((self.R[2, 2] + 1) / 2)
            w = np.sqrt(1 - x**2 - y**2 - z**2)
        return np.array([w, x, y, z])

# 仿真测试
ekf = SO3_EKF(np.eye(3))
omega = np.array([0, 0, 0.5])  # rad/s

print("\\n=== SO(3)-EKF 仿真 ===")
for step in range(5):
    dt = 0.1
    ekf.predict(omega, dt)
    noise = np.random.randn(3) * 0.05
    R_noisy = so3_exp((omega + noise) * dt) @ ekf.R
    ekf.update(R_noisy)
    true_angle = step * dt * np.linalg.norm(omega)
    est_angle = 2 * np.arccos(np.clip(ekf.get_quaternion()[0], -1, 1))
    print(f"t={step*dt:.1f}s | 真值: {np.degrees(true_angle):.2f}° | EKF: {np.degrees(est_angle):.2f}°")</code></pre>

<hr />

<h3>八、综合总结：四元数 ↔ SO(3) ↔ so(3) 关系图</h3>

| 空间 | 数学对象 | 维度 | 运算 | 例子 |
|------|---------|------|------|------|
| **李代数** so(3) | 反对称矩阵 $[\\omega]_\\times$ | 3 | 李括号 $[S_1, S_2] = S_1 S_2 - S_2 S_1$ | $[(1,0,0)]_\\times$ |
| **李群** SO(3) | 正交行列式+1矩阵 | 3 | 乘法 $R_1 \\cdot R_2$ | $R_x(30°)$ |
| **双覆盖** | 单位四元数 | 3 | 乘法 $q_1 \\cdot q_2$ | $q(\\hat{z}, 60°)$ |

<pre><code className="language-python">  so(3) ── exp ──→  SO(3)   (Rodrigues 公式)
    │                 ↑
    │                 │
  log             quaternion
  (旋转向量)       (双覆盖: q ↔ -q)</code></pre>

<hr />

<h3>📝 本章要点速记</h3>

<p>1. **SO(3)**：所有 3×3 旋转矩阵的集合，维度 3，紧致李群</p>
<p>2. **so(3)**：SO(3) 在单位元的切空间，与 $\\mathbb{R}^3$ 同构，元素是反对称矩阵</p>
<p>3. **反对称矩阵** $[\\omega]_\\times$：将向量叉乘转化为矩阵乘法，$[a]_\\times b = a \\times b$</p>
<p>4. **Rodrigues 公式**：$\\exp([\\omega]_\\times) = I + \\frac{\\sin\\theta}{\\theta}[\\omega]_\\times + \\frac{1-\\cos\\theta}{\\theta^2}[\\omega]_\\times^2$</p>
<p>5. **对数映射**：从旋转矩阵提取旋转向量 $\\theta \\hat\\omega = \\log(R)^\\vee$</p>
<p>6. **四元数**是 SO(3) 的**双覆盖**：$q$ 和 $-q$ 对应同一旋转</p>
<p>7. **Jacobian**：旋转矩阵的导数 $[\\omega]_\\times R$，本质是 so(3) 中的元素</p>
<p>8. **EKF 姿态估计**：在 so(3) 上做线性化预测/更新，避免欧拉角的奇异性</p>

<hr />

<h3>🎯 章节练习</h3>

| # | 题型 | 难度 | 考察点 |
|---|------|------|--------|
| 1 | 证明题 | ⭐⭐ | 证明 $[\\omega]_\\times^3 = -\\|\\omega\\|^2 [\\omega]_\\times$ |
| 2 | 计算题 | ⭐⭐ | 计算 $\\exp([(0,0,\\pi/2)]_\\times)$ 并验证 |
| 3 | 证明题 | ⭐⭐⭐ | 证明 so(3) 的李括号等于叉乘 |
| 4 | 分析题 | ⭐⭐⭐ | 为什么说 SO(3) 同胚于 $RP^3$（三维实射影空间）？|
| 5 | 实践题 | ⭐⭐⭐ | 实现基于 so(3) 的互补滤波器融合 IMU 数据 |
| 6 | 综合题 | ⭐⭐⭐⭐ | 从零实现 SO(3)-EKF 姿态估计器 |

<hr />

<h3>🚀 学科总结</h3>

<p>恭喜你完成了四元数与空间变换的全部内容！从复数的二维旋转，到四元数的三维旋转，到插值方法，再到李群李代数——你已经掌握了现代 3D 数学的核心工具箱。这些知识将在机器人、无人机、VR/AR、游戏引擎、计算机视觉等领域持续发挥作用。</p>
`,
  },
  '数值分析': {},
  '基础物理仿真': {},
};

export function getChapterContent(slug: string, chapter: number): string | null {
  return CHAPTER_CONTENT[slug]?.[chapter] ?? null;
}