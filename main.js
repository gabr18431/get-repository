let input = document.querySelector(".get-repos input");
let getBtn = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getBtn.onclick = getRepos;
function getRepos() {
    let inputVal = input.value;
    if (inputVal == "") {
        reposData.innerHTML = "<span>Please Write GitHub UserName . </span>";
    } else {
        logRepo(inputVal);
    }
}

async function logRepo(inputVal) {
    const response = await fetch(
        `https://api.github.com/users/${inputVal}/repos`
    );
    const repositories = await response.json();
    // console.log(repositories);
    reposData.innerHTML = "";
    console.log(repositories);
    repositories.forEach(repo => {
        let mainDiv = document.createElement("div");
        let nameDiv = document.createElement("div");
        let elementRepoName = document.createElement('a');
        elementRepoName.setAttribute('target', '_blank');
        let repoName = document.createTextNode(repo.name);
        elementRepoName.appendChild(repoName)
        elementRepoName.href = `https://github.com/${inputVal}/${repo.name}`
        nameDiv.appendChild(elementRepoName)
        mainDiv.appendChild(nameDiv)
        let url = document.createElement('a')
        url.appendChild(document.createTextNode('View'));
        // url.href = `http://github.com/ElzeroWebSchool/${repo.name}`
        url.href = `https://gabr18431.github.io/${repo.name}/`
        url.setAttribute('target', '_blank')
        mainDiv.appendChild(url)
        let starsSpan = document.createElement('span');
        starsSpan.appendChild(document.createTextNode(`stars count: ${repo.stargazers_count}`))
        mainDiv.appendChild(starsSpan)
        mainDiv.className = 'repo-box'
        reposData.appendChild(mainDiv)
        input.value = '';
    });
}
