const UserInput = document.getElementById('userInput')
        const btn = document.getElementById('getProfileBtn')
        const mainProfile = document.getElementById('profileFromGitHub')
        const jokebtn = document.getElementById('calljoke')
        const jokeContainer = document.getElementById('jokes')



        btn.addEventListener('click', async function () {
            let UserName = UserInput.value
            try {
                const userJson = await fetch(`https://api.github.com/users/${UserName}`)
                if (!userJson.ok) {
                    return mainProfile.innerHTML = "User Dont Exists"
                }
                const parsedJson = await userJson.json()
                UserInput.value = ""


                mainProfile.innerHTML = `
             <img src="${parsedJson.avatar_url}" width="120" style="border-radius: 50%;">
            <h2>${parsedJson.name || parsedJson.login}</h2>
            <p>${parsedJson.bio || "No bio provided."}</p>
            
            `
            } catch (error) {
                mainProfile.innerHTML = '<p>Something went wrong</p>'
                console.log(error.message);

            }


        })


        jokebtn.addEventListener('click', async function () {

            const url = 'https://api.freeapi.app/api/v1/public/randomjokes/joke/random';
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                
               jokeContainer.innerHTML = `
                         <p style="width: 500px;">${data.data.content}😂</p>
               `
            //    console.log(data.data.content);
               

            } catch (error) {
                console.error(error);
            }
        })

