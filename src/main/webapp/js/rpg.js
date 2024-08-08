window.onload = async function getPlayers() {
    let response = await fetch('rest/players');
    let players = await response.json();
    console.log(players);

    console.log(await getAccountsCount());

    fillTable(players);

    pagesLabelView();
}

function fillTable(players) {
    for (let player of players) {
        let mainDiv = document.getElementById("mainDivTable");
        let row = document.createElement("div");
        row.style.display = "flex";

        let colNumber = document.createElement("div");
        colNumber.style.width = "2%";
        colNumber.innerHTML = player.id;
        row.append(colNumber);

        let colName = document.createElement("div");
        colName.style.width = "10%";
        colName.innerHTML = player.name;
        row.append(colName);

        let colTitle = document.createElement("div");
        colTitle.style.width = "18%";
        colTitle.innerHTML = player.title;
        row.append(colTitle);

        let colRace = document.createElement("div");
        colRace.style.width = "10%";
        colRace.innerHTML = player.race;
        row.append(colRace);

        let colProfession = document.createElement("div");
        colProfession.style.width = "10%";
        colProfession.innerHTML = player.profession;
        row.append(colProfession);

        let colLevel = document.createElement("div");
        colLevel.style.width = "10%";
        colLevel.innerHTML = player.level;
        row.append(colLevel);

        let colBirthday = document.createElement("div");
        colBirthday.style.width = "10%";
        let date = new Date(player.birthday);
        colBirthday.innerHTML = date.getMonth() + 2 + '/' + date.getDate() + '/' + date.getFullYear();
        row.append(colBirthday);

        let colBanned = document.createElement("div");
        colBanned.style.width = "10%";
        colBanned.innerHTML = player.banned;
        row.append(colBanned);
        mainDiv.append(row);
    }
}

async function getAccountsCount() {
    let response = await fetch('rest/players/count');
    let count = await response.json();
    return count;
}

async function pagesLabelView() {
    let countPerPage = document.getElementById('countPerPage');
    let divPages = document.getElementById("pages");
    let countPages = Math.ceil(await getAccountsCount() / countPerPage.value);
    for (let i = 0; i < countPages; i++) {
        let input = document.createElement("input");
        input.type = "button";
        input.value = i + 1;
        divPages.append(input);
    }
}
