// Welcome Screen Closure
function closeWelcome() {
    const overlay = document.getElementById('welcome-screen');
    overlay.style.transition = '0.5s';
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
}

// Mobile Tab Switcher
function showTab(tabName) {
    const inputPanel = document.getElementById('input-section');
    const previewPanel = document.getElementById('preview-section');
    const btnEdit = document.getElementById('btn-edit');
    const btnPreview = document.getElementById('btn-preview');

    if (tabName === 'edit') {
        inputPanel.classList.add('active-tab'); previewPanel.classList.remove('active-tab');
        btnEdit.classList.add('active'); btnPreview.classList.remove('active');
    } else {
        previewPanel.classList.add('active-tab'); inputPanel.classList.remove('active-tab');
        btnPreview.classList.add('active'); btnEdit.classList.remove('active');
    }
}

// Basic Sync
const fields = ['name', 'title', 'email', 'phone', 'location', 'cnic', 'summary'];
fields.forEach(id => {
    document.getElementById(`in-${id}`).addEventListener('input', (e) => {
        document.getElementById(`out-${id}`).innerText = e.target.value || (id === 'name' ? 'YOUR NAME' : '-');
    });
});

// Skills
const skillsInput = document.getElementById('in-skills');
function updateSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';
    skillsInput.value.split(',').forEach(s => {
        if(!s.trim()) return;
        container.innerHTML += `<div class="skill-box"><span class="skill-name">${s.trim()}</span><div class="bar-bg"><div class="bar-fill"></div></div></div>`;
    });
}
skillsInput.addEventListener('input', updateSkills);

// Education
function addEducationField() {
    const container = document.getElementById('education-inputs');
    const div = document.createElement('div');
    div.className = 'edu-group';
    div.innerHTML = `<hr><input type="text" class="in-edu-title" placeholder="Degree"><input type="text" class="in-edu-meta" placeholder="Institute | Year">`;
    container.appendChild(div);
    attachEduListeners();
}

function attachEduListeners() {
    const titles = document.querySelectorAll('.in-edu-title');
    const metas = document.querySelectorAll('.in-edu-meta');
    const display = document.getElementById('education-container');
    const update = () => {
        display.innerHTML = '';
        titles.forEach((t, i) => {
            if(!t.value) return;
            display.innerHTML += `<div class="edu-item"><div class="job-title">${t.value}</div><div class="job-meta">${metas[i].value}</div></div>`;
        });
    };
    [...titles, ...metas].forEach(el => el.addEventListener('input', update));
}

// Experience
function addExperienceField() {
    const container = document.getElementById('experience-inputs');
    const div = document.createElement('div');
    div.className = 'exp-group';
    div.innerHTML = `<hr><input type="text" class="in-job-title" placeholder="Job Title"><input type="text" class="in-job-meta" placeholder="Company | Date"><textarea class="in-job-desc" placeholder="Responsibilities"></textarea>`;
    container.appendChild(div);
    attachExpListeners();
}

function attachExpListeners() {
    const titles = document.querySelectorAll('.in-job-title');
    const metas = document.querySelectorAll('.in-job-meta');
    const descs = document.querySelectorAll('.in-job-desc');
    const display = document.getElementById('experience-container');
    const update = () => {
        display.innerHTML = '';
        titles.forEach((t, i) => {
            if(!t.value) return;
            const tasks = descs[i].value.split('\n').filter(l => l.trim()).map(line => `<li>${line}</li>`).join('');
            display.innerHTML += `<div class="experience-item"><div class="job-header"><span class="job-title">${t.value}</span><span class="job-meta">${metas[i].value}</span></div><ul>${tasks}</ul></div>`;
        });
    };
    [...titles, ...metas, ...descs].forEach(el => el.addEventListener('input', update));
}

attachEduListeners();
attachExpListeners();