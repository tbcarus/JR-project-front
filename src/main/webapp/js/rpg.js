let pageNumberGlobal = 0;
let pageSizeGlobal = 3;

window.onload = async function () {
    await refreshTable();
}

async function refreshTable(){
    let players = await getPlayers(pageNumberGlobal, pageSizeGlobal);
    fillTable(players);
    await pagesLabelView(pageNumberGlobal);
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
        row.id = player.id;
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

        let colEdit = document.createElement("div");
        colEdit.style.width = "10%";
        colEdit.innerHTML = '<img src="img/edit.png" style="width: 25px; cursor: pointer">';
        colEdit.onclick = function () {
            editRow(row.id, player);
        };
        row.append(colEdit);

        let colDelete = document.createElement("div");
        colDelete.style.width = "10%";
        colDelete.innerHTML = '<img src="img/delete.png" style="width: 25px; cursor: pointer">';
        colDelete.onclick = function () {
            deletePlayer(player.id);
        };
        row.append(colDelete);

        mainDiv.append(row);
    }
}

async function editRow(rowId, player) {
    let row = document.getElementById(rowId);
    row.innerHTML = '';

    let colNumber = document.createElement("div");
    colNumber.style.width = "2%";
    colNumber.innerHTML = player.id;
    row.append(colNumber);

    let colName = document.createElement("div");
    colName.style.width = "10%";
    let inputName = document.createElement('input');
    inputName.name = 'name';
    inputName.value = player.name;
    inputName.style.width = '100px';
    colName.append(inputName);
    row.append(colName);

    let colTitle = document.createElement("div");
    colTitle.style.width = "18%";
    let inputTitle = document.createElement('input');
    inputTitle.name = 'title';
    inputTitle.value = player.title;
    inputTitle.style.width = '100px';
    colTitle.append(inputTitle);
    row.append(colTitle);

    let colRace = document.createElement("div");
    colRace.style.width = "10%";
    let selectRace = document.createElement('select');
    selectRace.name = 'race';
    const enumRace = {
        HUMAN: 'HUMAN', DWARF: 'DWARF', ELF: 'ELF', GIANT: 'GIANT', ORC: 'ORC', TROLL: 'TROLL', HOBBIT: 'HOBBIT'
    }
    for (let race in enumRace) {
        let opt = document.createElement('option');
        opt.value = race;
        opt.text = race;
        if (race === player.race) {
            opt.selected = 'selected';
        }
        selectRace.append(opt);
    }
    colRace.append(selectRace);
    row.append(colRace);

    let colProfession = document.createElement("div");
    colProfession.style.width = "10%";
    let selectProf = document.createElement('select');
    selectProf.name = 'profession';
    const enumProf = {
        WARRIOR: 'WARRIOR',
        ROGUE: 'ROGUE',
        SORCERER: 'SORCERER',
        CLERIC: 'CLERIC',
        PALADIN: 'PALADIN',
        NAZGUL: 'NAZGUL',
        WARLOCK: 'WARLOCK',
        DRUID: 'DRUID'
    }
    for (let prof in enumProf) {
        let opt = document.createElement('option');
        opt.value = prof;
        opt.text = prof;
        if (prof === player.profession) {
            opt.selected = 'selected';
        }
        selectProf.append(opt);
    }
    colProfession.append(selectProf);
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
    let selectBan = document.createElement('select');
    selectBan.name = 'banned';
    const enumBan = {true: true, false: false}
    for (let ban in enumBan) {
        let opt = document.createElement('option');
        opt.value = ban === 'true';
        opt.text = ban === 'true';
        if (player.banned === (ban === 'true')) {
            opt.selected = 'selected';
        }
        selectBan.append(opt);
    }
    colBanned.append(selectBan);
    row.append(colBanned);

    let colSave = document.createElement("div");
    colSave.style.width = "10%";
    colSave.innerHTML = '<img src="img/save.png" style="width: 25px; cursor: pointer">';
    colSave.onclick = async function () {
        player.name = inputName.value;
        player.title = inputTitle.value;
        player.race = selectRace.value;
        player.profession = selectProf.value;
        player.banned = selectBan.value;
        let jsPlayer = JSON.stringify(player);
        let response = await fetch('rest/players/' + player.id, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json;charset=utf-8'
            },
            body: JSON.stringify(player)
        });
        await refreshTable();
    };
    row.append(colSave);

    let colDelete = document.createElement("div");
    colDelete.style.width = "10%";
    row.append(colDelete);

}

async function savePlayer() {

    let name = document.getElementById('name-new');
    let title = document.getElementById('title-new');
    let race = document.getElementById('race-new');
    let profession = document.getElementById('profession-new');
    let level = document.getElementById('level-new');
    let birthday = document.getElementById('birthday-new');
    let banned = document.getElementById('banned-new');

    let response = await fetch('rest/players', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "name": name.value,
            "title": title.value,
            "race": race.value,
            "profession": profession.value,
            "level": level.value,
            "birthday": new Date(birthday.value).getTime(),
            "banned": banned.value
        })
    });
    await refreshTable();
    name.value = '';
    title.value = '';
    level.value = '';
    birthday.value = '';
    banned.value = 'true';
    race.value = 'HUMAN';
    profession.value = 'WARRIOR';
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
    return await response.json();
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
