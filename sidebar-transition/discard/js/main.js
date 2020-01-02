var asideBar = $('#aside');

var mainDiv = $('main')[0];

var btns = $('button', $('#effect-options'));

var initialStyle;

var changedStyle;

//在按键btns[i]的changedStyle属性写入参与动画的页面元素及其属性，CSS文件中对应页面元素的transition-property也要加上参与变化的属性
btns[0].initialStyle = [{ name: 'asideBar', changedStyleProperties: {'display': 'block', 'left': '-300px', 'transitionProperty': 'left', 'zIndex': '2' } }];
btns[0].changedStyle = [{ name: 'asideBar', changedStyleProperties: {'left': '0' } }];

btns[1].initialStyle = [{ name: 'asideBar', changedStyleProperties: {'display': 'block', 'zIndex': '-1'}},
                        { name: 'main', changedStyleProperties: {'display': 'block', 'transitionProperty': 'left', 'left': '0'}}]
btns[1].changedStyle = [{name: 'main', changedStyleProperties: {'left': '300px'}}]

for (var btn = 0; btn < btns.length; btn++) {
    addHandler(btns[btn], 'click', setInitialStyle);
}

function setInitialStyle() {

    asideBar.style = '';
    mainDiv.style = '';

    var target = getTarget(event);

    initialStyle = target.initialStyle;

    setStyleProperties(initialStyle);

    removeHandler(target, 'click', setInitialStyle);

    addHandler(target, 'click', setEffect);

    //为什么这样可以？
    setTimeout(function() {target.click();}, 0);
}

function setEffect() {

    changedStyle = getTarget(event).changedStyle;   

    mainDivChange();

    setStyleProperties(changedStyle);

    getEvent(event).stopPropagation();

    addHandler(document, 'click', cancelEffect);
}

function cancelEffect() {
    mainDivCancleChange();
    setStyleProperties(initialStyle);

    removeHandler(document, 'click', cancelEffect);
}

function mainDivChange() {
    mainDiv.style.backgroundColor = '#CAD3C8';
    mainDiv.style.opacity = '0.5';
    mainDiv.style.zIndex = 1;
}

function mainDivCancleChange() {
    mainDiv.style.background = '';
    mainDiv.style.opacity = '';
    mainDiv.style.zIndex = 0;
}

function setStyleProperties(changedStyle) {
    for (var ele of changedStyle) {
        var properties = ele.changedStyleProperties;
        switch (ele.name) {
            case 'asideBar':      
                for (var property in properties) {
                    asideBar.style[property] = properties[property];
                }
                break;
            default:
                break;
        }
    }
}

