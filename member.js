function skillsMember() {
    //var member = document.querySelector('.member');
    var member = document.querySelector('.member');
    var memberTop = member.getBoundingClientRect().top;
    var memberHeight = member.clientHeight;
    var memberBottom = memberTop + memberHeight;

    var skills = document.querySelector('.skills');
    var skillsTop = skills.getBoundingClientRect().top;
    var skillsHeight = skills.clientHeight;
    var skillsBottom = skillsTop + skillsHeight;

    var skill = document.querySelectorAll('.skill');
    var skillTop = skill[0].getBoundingClientRect().top;
    var skillHeight = skill[0].clientHeight;
    var skillBottom = skillTop + skillHeight;
    var skillLength = skill.length;

    if (memberBottom >= skillsTop && memberTop <= skillsBottom) {
        for (var i = 0; i < skillLength; i++) {
            if (skillBottom >= skillsTop && skillTop <= skillsBottom) {
                skill[i].classList.add('active');
            } else {
                skill[i].classList.remove('active');
            }
        }
    }
}