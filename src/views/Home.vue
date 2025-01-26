<template>
  <div class="container">
    <div class="card">
      <h1>社員管理システム</h1>
      <p>これは機能豊富な社員管理システムで、企業の管理者がユーザー、従業員、部門情報を効率的に管理できるように設計されています。システムの主な機能は以下の通りです：</p>
    </div>

    <div class="card">
      <h2>主な機能</h2>
      <ul>
        <li><span class="feature-icon">👤</span><strong>ユーザー管理：</strong> ユーザーの登録、ログイン、権限管理（一般従業員と管理者）をサポートします。</li>
        <li><span class="feature-icon">🔑</span><strong>パスワード管理：</strong> ユーザーはパスワードを変更でき、管理者はすべてのユーザーのアカウント情報を管理できます。</li>
        <li><span class="feature-icon">📝</span><strong>通知管理：</strong> 通知の追加、削除、編集、検索機能を提供し、管理者がコンテンツを管理しやすくします。</li>
        <li><span class="feature-icon">👥</span><strong>従業員と部門の管理：</strong> 従業員情報の管理をサポートし、部門情報の追加、削除、編集、検索が可能です。</li>
        <li><span class="feature-icon">📊</span><strong>データ管理：</strong> グラフ機能があり、過去7日間に公開された通知や各部門の従業員数をリアルタイムで表示し、管理者がシステムの運営状況を迅速に把握できるようにします。</li>
      </ul>
    </div>

    <div class="card">
      <h2>システムの特徴</h2>
      <ul>
        <li><strong>操作が簡単：</strong> シンプルな操作インターフェースで、簡単に使用できます。</li>
        <li><strong>データ可視化：</strong> 内蔵されたグラフで、リアルタイムでデータを表示し、意思決定をサポートします。</li>
        <li><strong>高いセキュリティ：</strong> 厳格なユーザー権限管理により、データの安全性が確保されます。</li>
      </ul>
    </div>

    <div class="card">
      <p>本システムは、操作の簡便さとデータ可視化に重点を置き、企業にとってより効率的な管理体験を提供することを目指しています。</p>
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
