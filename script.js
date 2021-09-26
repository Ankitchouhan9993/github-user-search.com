const username=document.querySelector('.user');
const search=document.querySelector('.fa-search');
search.addEventListener('click',loadUser);
async function loadUser(){
   const user=username.value;
   const response= await fetch(`https://api.github.com/users/${user}`);
   const responseRepo= await fetch(`https://api.github.com/users/${user}/repos`);
   const userInfo= await response.json();
   const responsefollowers= await fetch(`https://api.github.com/users/${user}/following`);
   const follo= await responsefollowers.json();
   const repos= await responseRepo.json();
   updateDetails(userInfo,repos,follo);
}
const updateDetails=function(i,r,f){
            const cont=`
                <div class="avartar">
                    <img src="${i.avatar_url}" alt="avatar">
                </div>
                <div class="right-detail">
                    <div class="details">
                        <h2 class="title">${i.name}</h2>
                        <h4 class="username">${i.login}</h4>
                    </div>
                    <div class="bio">
                        ${i.bio}
                    </div>
                    <div class="company">
                        <i class="fa fa-user"></i>
                        ${i.company}
                    </div>
                    <div class="works">
                        <div class="sub-works">
                            <div class="num">${i.followers}</div>
                            <h5 class="work-name">Followers</h5>
                        </div>
                        <div class="sub-works">
                            <div class="num">${i.following}</div>
                            <h5 class="work-name">Followings</h5>
                        </div>
                        <div class="sub-works">
                            <div class="num">${i.public_repos}</div>
                            <h5 class="work-name">Repos</h5>
                        </div>
                    </div>
                </div>
            `;
            let reposit=`<h2>Repositories</h2>`;
            for(var index in r){
                reposit+=`<div class="repos-item">
                <div class="repo-title">${r[index].name}</div>
                <p class="repo-description">${r[index].description}</p>
            </div>`
            }
           
            let followers=`<h2>Followers</h2>`;
            for(var index in f){
                followers+=`<div class="follo-items">
                <img src="${f[index].avatar_url}" alt="avatar" class="profile">
                <div class="name">${f[index].login}</div>
            </div>`;
            }
            document.querySelector('.content').innerHTML=cont;
            document.querySelector('.repo').innerHTML=reposit;
            document.querySelector('.followers').innerHTML=followers;
}