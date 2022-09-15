
const userNameInput = document.getElementById('userName')
const showDetailsButton = document.getElementById('showDetails')
const profileInfoDiv = document.getElementById('profileInfo')
const reposInfoDiv = document.getElementById('reposInfo')

// Using Async and Await 

function showProfile(data){
    profileInfoDiv.innerHTML = `<div class="card">
           <div class="card-img">
                    <img src=${data.avatar_url} alt=${data.name} />
             </div>
             <div class="card-body">
                    <div class="card-title">${data.name}</div>
                    <div class="card-subHeading">${data.login}</div>
                    <div class="card-text">
                          <p>${data.bio}</p>
                          <p>${data.followers} followers ${data.following} following
                          <button>
                              <a href=${data.html_url}>
                              Do checkout My Profile
                              </a>
                          </button>
                    </div>
              </div>
      </div>`
}



showDetailsButton.addEventListener('click', async ()=>{
  const userName = userNameInput.value
  // Request The Data from Server using FetchAPI
  const val = await fetch(`https://api.github.com/users/${userName}`)
  const data = await val.json()

  showProfile(data)
  showReposInfo(userName)
})





async function showReposInfo(userName){
  const val = await fetch(`https://api.github.com/users/${userName}/repos`)
  const projects = await val.json()

      projects.forEach((project)=>{
            reposInfoDiv.innerHTML += `<div class="card">

                     <div class="card-body">
                            <div class="card-title">${project.name}</div>
                            <div class="card-subHeading">${project.language}</div>
                            <div class="card-text">
                                  <button>
                                      <a href=${project.html_url}>
                                      Do checkout Project
                                      </a>
                                  </button>
                            </div>
                      </div>

              </div>`
      })

}


