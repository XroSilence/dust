"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DustupLogo = function () {
    var _a = (0, react_1.useState)(false), isHovered = _a[0], setIsHovered = _a[1];
    return className = "p-8 bg-slate-900 rounded-lg" >
        className;
    "relative w-64 h-64 transition-transform duration-300 transform hover:scale-105";
    onMouseEnter = {}();
};
setIsHovered(true);
onMouseLeave = {}();
setIsHovered(false);
    >
        viewBox;
"0 0 24 24";
className = {}(templateObject_1 || (templateObject_1 = __makeTemplateObject(["w-full h-full transition-all duration-500 ", ""], ["w-full h-full transition-all duration-500 ", ""])), isHovered ? 'drop-shadow-lg filter' : '');
    >
        { /* Ground symbol lines that double as facial features */}
    < g;
className = {}(templateObject_2 || (templateObject_2 = __makeTemplateObject(["transition-all duration-300 ", ""], ["transition-all duration-300 ", ""])), isHovered ? 'stroke-blue-400' : 'stroke-white');
 >
    d;
"M6 8h12";
strokeWidth = "2.5";
strokeLinecap = "round";
className = {}(templateObject_3 || (templateObject_3 = __makeTemplateObject(["transition-all duration-300 ", ""], ["transition-all duration-300 ", ""])), isHovered ? 'stroke-yellow-400' : '');
/>
    < path;
d = "M6 12h12";
strokeWidth = "2.5";
strokeLinecap = "round";
className = {}(templateObject_4 || (templateObject_4 = __makeTemplateObject(["transition-all duration-300 ", ""], ["transition-all duration-300 ", ""])), isHovered ? 'stroke-cyan-400' : '');
/>
    < path;
d = "M6 16h12";
strokeWidth = "2.5";
strokeLinecap = "round";
className = {}(templateObject_5 || (templateObject_5 = __makeTemplateObject(["transition-all duration-300 ", ""], ["transition-all duration-300 ", ""])), isHovered ? 'stroke-green-400' : '');
/>
    < /g>;
{ /* Angular "eyes" that suggest voltage symbols */ }
className;
{
    "transition-all duration-300 ".concat(isHovered ? 'stroke-red-400' : 'stroke-white');
}
 >
    d;
"M8 6l-2 2M16 6l2 2";
strokeWidth = "2";
strokeLinecap = "round"
    /  >
    /g>;
{ /* Determined "mouth" that's also a voltage arrow */ }
d;
"M9 18l3-2l3 2";
className = {}(templateObject_6 || (templateObject_6 = __makeTemplateObject(["transition-all duration-300 ", ""], ["transition-all duration-300 ", ""])), isHovered ? 'stroke-purple-400' : 'stroke-white');
strokeWidth = "2";
strokeLinecap = "round"
    /  >
    { /* Subtle background glow effect */}
    < circle;
cx = "12";
cy = "12";
r = "10";
className = {}(templateObject_7 || (templateObject_7 = __makeTemplateObject(["transition-all duration-500 ", ""], ["transition-all duration-500 ", ""])), isHovered
    ? 'stroke-blue-500/30 stroke-2'
    : 'stroke-transparent');
fill = "none"
    /  >
    /svg>;
{ /* Company name */ }
className;
{
    "\n          absolute -bottom-8 left-0 right-0 text-center \n          font-bold text-lg transition-all duration-300\n          ".concat(isHovered ? 'text-blue-400' : 'text-white', "\n        ");
}
 >
    DUSTUP;
LTD;
/div>
    < /div>
    < /div>;
;
;
exports.default = DustupLogo;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
