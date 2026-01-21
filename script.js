// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 1. 加载组件的通用函数（加载根目录下的组件文件）
    function loadComponent(id, url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`加载组件 ${id} 失败: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById(id).innerHTML = html;
                // 组件加载完成后初始化对应交互
                if (id === 'header') {
                    initNav();
                    initLanguageSwitcher();
                }
                if (id === 'research') {
                    initResearchToggle();
                }
            })
            .catch(error => {
                console.error(error);
                document.getElementById(id).innerHTML = `<p style="color: red; text-align: center; padding: 20px;">加载失败: ${error.message}</p>`;
            });
    }

    // 加载所有组件（根目录下的文件，直接写文件名）
    loadComponent('header', 'header.html');
    loadComponent('hero', 'hero.html');
    loadComponent('home', 'home.html');
    loadComponent('education', 'education.html');
    loadComponent('research', 'research.html');
    loadComponent('projects', 'projects.html');
    loadComponent('footer', 'footer.html');

    // 2. 初始化导航栏交互
    function initNav() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 移除所有导航项的激活状态
                navLinks.forEach(l => l.classList.remove('active'));
                // 给当前点击的导航项添加激活状态
                this.classList.add('active');
                
                // 隐藏所有板块，显示当前选中的板块
                const targetSectionId = this.dataset.section;
                sections.forEach(sec => {
                    sec.classList.remove('active');
                    sec.style.display = 'none';
                });
                
                const targetSection = document.getElementById(targetSectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    targetSection.style.display = 'block';
                    // 平滑滚动到目标板块
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // 3. 初始化研究经历折叠/展开交互
    function initResearchToggle() {
        const researchHeaders = document.querySelectorAll('.research-header');
        
        researchHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('.toggle-icon');
                
                // 切换内容显示状态
                content.classList.toggle('active');
                content.style.display = content.classList.contains('active') ? 'block' : 'none';
                // 切换图标旋转状态
                icon.classList.toggle('active');
            });
        });
    }

    // 4. 初始化语言切换功能（核心：同步切换所有中英文内容）
    function initLanguageSwitcher() {
        const langZhBtn = document.getElementById('lang-zh');
        const langEnBtn = document.getElementById('lang-en');
        const langZhElements = document.querySelectorAll('.lang-zh');
        const langEnElements = document.querySelectorAll('.lang-en');

        // 初始状态：默认显示中文
        langZhElements.forEach(el => {
            el.style.display = el.tagName === 'SPAN' && el.parentElement.tagName === 'A' ? 'inline' : 'block';
        });
        langEnElements.forEach(el => el.style.display = 'none');

        // 切换到中文
        langZhBtn.addEventListener('click', function() {
            langZhBtn.classList.add('active');
            langEnBtn.classList.remove('active');
            
            langZhElements.forEach(el => {
                // 区分行内元素（导航文字）和块级元素（段落/标题）
                if (el.tagName === 'SPAN' && el.parentElement.tagName === 'A') {
                    el.style.display = 'inline';
                } else {
                    el.style.display = 'block';
                }
            });
            langEnElements.forEach(el => el.style.display = 'none');
        });

        // 切换到英文
        langEnBtn.addEventListener('click', function() {
            langEnBtn.classList.add('active');
            langZhBtn.classList.remove('active');
            
            langEnElements.forEach(el => {
                // 区分行内元素（导航文字）和块级元素（段落/标题）
                if (el.tagName === 'SPAN' && el.parentElement.tagName === 'A') {
                    el.style.display = 'inline';
                } else {
                    el.style.display = 'block';
                }
            });
            langZhElements.forEach(el => el.style.display = 'none');
        });
    }
});
