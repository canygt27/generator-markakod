function CallFunction() {

    var select = document.getElementById('team-list');
    var teamElements = document.getElementsByClassName('team-element');
    var currentSelectedTeamId = -1;

    var self = this;

    var jsonObj = [
        {
            name: "Arsenal",
            teamId: 3
        },
        {
            name: "Bournemouth",
            teamId: 91
        },
        {
            name: "Burnley",
            teamId: 90
        },

        {
            name: "Chelsea",
            teamId: 8
        },
        {
            name: "Crystal Palace",
            teamId: 31
        },
        {
            name: "Everton",
            teamId: 11
        },

        {
            name: "Hull City",
            teamId: 88
        },
        {
            name: "Leicester City",
            teamId: 13
        },
        {
            name: "Liverpool",
            teamId: 14
        },

        {
            name: "Manchester City",
            teamId: 43
        },
        {
            name: "Manchester United",
            teamId: 1
        },
        {
            name: "Middlesbrough",
            teamId: 25
        },

        {
            name: "Southampton",
            teamId: 20
        },
        {
            name: "Stoke City",
            teamId: 110
        },

        {
            name: "Sunderland",
            teamId: 56
        },
        {
            name: "Swensea City",
            teamId: 80
        },
        {
            name: "Tottenham Hotspur",
            teamId: 6
        },

        {
            name: "Watford",
            teamId: 57
        },
        {
            name: "West Bromwich Albion",
            teamId: 35
        },
        {
            name: "West Ham United",
            teamId: 21
        }
    ];

    this.clearTeamSelection = function () {
        Array.prototype.slice.call(teamElements).map(function (elem) {
            elem.classList.remove("passive");
        });
    };

    this.teamSelectionChanged = function (e) {
        var selectionId = select.options[e.target.selectedIndex].value;

        // console.log(selectionId,currentSelectedTeamId);
        //simple check
        if (selectionId == currentSelectedTeamId) return;

        currentSelectedTeamId = selectionId;
        Array.prototype.slice.call(teamElements).map(function (elem) {
            elem.classList.remove("passive");
            if (parseInt(elem.dataset.id) != parseInt(currentSelectedTeamId)) {
                elem.classList.add("passive");
            }
        });
    };

    var init = function () {

        //appending select
        for (var o = 0; o <= 19; o++) {
            var option = document.createElement('option');

            option.value = jsonObj[o].teamId;
            option.innerHTML = jsonObj[o].name;

            select.appendChild(option);
        }

        select.addEventListener("change", self.teamSelectionChanged);
    };

    init();
}

module.exports = CallFunction;