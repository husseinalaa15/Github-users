const APIURL = "https://api.github.com/users/"

const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');


async function getUser(user){
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();
    console.log(respData)
    createUserCard(respData)

    getRepos(user)



}

async function getRepos(user){
    const resp = await fetch (APIURL + user +"/repos");
    const respData = await resp.json();

    addReposToCard(respData);
}

function addReposToCard(repos){
    const reposEl = document.getElementById('repos');
    repos.forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href= repo.html_url;
        repoEl.target= '_blank';
        repoEl.innerText =repo.name;

        reposEl.appendChild(repoEl)
    });
}

function createUserCard(user){
    const cardHTML= `
    <div class="card">
        <div class="img-container"> 
            <img class='avatar' src='${user.avatar_url}' alt="${user.name}"/>
        </div>
        <div class="user-info">
            <h3>${user.name}</h3>
            <p>${user.bio}</p>
            <a href="${user.blog}">${user.blog}</a>

            <ul class="info">
                <li><i class="fab fa-twitter"></i> ${user.twitter_username}</li>
                <li><i class="fab fa-github"></i> ${user.login}</li>
                <li><i class="fas fa-folder"></i> ${user.public_repos} <span>Repos</span></li>

            </ul>
            <h4>Repos:</h4>
            <div  class="repos" id="repos"></div>

        </div>
    </div>
    `;
    main.innerHTML= cardHTML; 
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
   let  user = search.value;

   if(user){
       getUser(user);
       search.value = '';
   }
})