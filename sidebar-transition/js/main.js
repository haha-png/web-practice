var asideBar = $('#aside');

var mainDiv = $('main')[0];

var btns = $('button', $('#effect-options'));

var initialStyle;

var changedStyle;

//在按键btns[i]的changedStyle属性写入参与动画的页面元素及其属性，CSS文件中对应页面元素的transition-property也要加上参与变化的属性
btns[0].initialStyle = [{ name: 'asideBar', changedStyleProperties: { 'left': '-300px', 'transitionProperty': 'left' } }];
btns[0].changedStyle = [{ name: 'asideBar', changedStyleProperties: { 'display': 'block', 'left': '0' } }];

btns[1].changedStyle = [{ name: 'asideBar', changedStyleProperties: {} }]

for (var btn = 0; btn < btns.length; btn++) {
    addHandler(btns[btn], 'mousedown', setInitialStyle);
    addHandler(btns[btn], 'click', setEffect);
}

function setInitialStyle() {

    initialStyle = getTarget(event).initialStyle;

    setStyleProperties(initialStyle);

}

function setEffect() {
    // initialStyle = getTarget(event).initialStyle;

    // setStyleProperties(initialStyle);

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

