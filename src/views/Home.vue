<template>
  <div class="container">
    <div class="card">
      <h1>后台管理系统</h1>
      <p>这是一个功能丰富的后台管理系统，旨在帮助企业管理员高效管理用户、员工和部门信息。系统具备以下主要功能：</p>
    </div>

    <div class="card">
      <h2>主要功能</h2>
      <ul>
        <li><span class="feature-icon">👤</span><strong>用户管理：</strong> 支持用户的注册、登录、权限管理（普通员工和管理员）。</li>
        <li><span class="feature-icon">🔑</span><strong>密码管理：</strong> 用户可修改密码，管理员可管理所有用户的账户信息。</li>
        <li><span class="feature-icon">📝</span><strong>文章管理：</strong> 提供文章的增、删、改、查功能，方便管理员对内容进行管理。</li>
        <li><span class="feature-icon">👥</span><strong>员工与部门管理：</strong> 支持员工信息的管理，并可增、删、改、查部门信息。</li>
        <li><span class="feature-icon">📊</span><strong>数据管理：</strong> 包含图表功能，实时展示近7天内发布的文章数量和各部门员工人数，帮助管理员快速了解系统运营情况。</li>
      </ul>
    </div>

    <div class="card">
      <h2>系统特点</h2>
      <ul>
        <li><strong>易操作：</strong> 简单的操作界面，轻松上手。</li>
        <li><strong>数据可视化：</strong> 内置图表，实时展示数据，便于决策分析。</li>
        <li><strong>安全性高：</strong> 严格的用户权限控制，保障数据安全。</li>
      </ul>
    </div>

    <div class="card">
      <p>本系统注重操作简便与数据可视化，致力于为企业提供更高效的管理体验。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #4e79a7, #1d3c6e); /* 渐变蓝色背景 */
  color: #fff;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: rgba(255, 255, 255, 0.9); /* 透明卡片背景 */
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);
}

h1 {
  color: #007bff;
  text-align: center;
  font-size: 3em;
  margin-bottom: 20px;
}

h2 {
  color: #28a745;
  font-size: 2em;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  font-size: 1.1em;
  margin-bottom: 15px;
  line-height: 1.8;
}

.feature-icon {
  color: #007bff;
  margin-right: 10px;
}

ul li strong {
  color: #333;
}

.note {
  background-color: #fff3cd;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ffeeba;
  margin-bottom: 20px;
}

.card p {
  font-size: 1.2em;
  color: #333;
  line-height: 1.6;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5em;
  }
  h2 {
    font-size: 1.7em;
  }
  .container {
    padding: 10px;
  }
}
</style>
