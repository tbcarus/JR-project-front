let pageNumberGlobal = 0;
let pageSizeGlobal = 3;

window.onload = async function () {
    let players = await getPlayers(pageNumberGlobal, pageSizeGlobal);
    fillTable(players);
    await pagesLabelView(0);
}


async function getPlayers(pageNumber, pageSize) {
    let response = await fetch('rest/players?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
    return await response.json();

    // fillTable(players);
    // await pagesLabelView();
}

function fillTable(players) {
    let mainDiv = document.getElementById("mainDivTable");
    mainDiv.innerHTML = '';
    for (let player of players) {
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

        let colEdit = document.createElement("div");
        colEdit.style.width = "10%";
        colEdit.innerHTML = '<img src="img/edit.png" style="width: 25px">';
        row.append(colEdit);
        mainDiv.append(row);

        let colDelete = document.createElement("div");
        colDelete.style.width = "10%";
        colDelete.innerHTML = '<img src="img/delete.png" style="width: 25px">';
        colDelete.onclick = function () {
            deletePlayer(player.id);
        };
        row.append(colDelete);
        mainDiv.append(row);
    }
}

async function deletePlayer(playerId) {
    let pageSize = document.getElementById("pageSize");
    await fetch('rest/players/' + playerId, {
        method: 'DELETE'
    })
    let players = await getPlayers(pageNumberGlobal, pageSizeGlobal);
    fillTable(players);
}

async function getAccountsCount() {
    let response = await fetch('rest/players/count');
    let count = await response.json();
    return count;
}

async function pageSizeChange(value) {
    pageSizeGlobal = value;
    let players = await getPlayers(0, value);
    fillTable(players);
    await pagesLabelView(0);
}

async function pagesLabelView(pageNumber) {
    // let countPerPage = document.getElementById('pageSize');
    let divPages = document.getElementById("pages");
    let countPages = Math.ceil(await getAccountsCount() / pageSizeGlobal);
    divPages.innerHTML = '';
    divPages.innerHTML = 'Pages: ';
    for (let i = 0; i < countPages; i++) {
        let input = document.createElement("input");
        input.type = "button";
        input.value = i + 1;
        input.onclick = function () {
            getPage(i, pageSizeGlobal)
        };
        if (i === pageNumber) {
            input.style.color = 'red';
        }
        divPages.append(input);
    }
}

async function getPage(pageNumber, pageSize) {
    pageNumberGlobal = pageNumber;
    let players = await getPlayers(pageNumber, pageSize);
    fillTable(players);
    await pagesLabelView(pageNumber);
}
