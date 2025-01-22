import{j as e}from"./index-D4HixOcG.js";import{r as c,u as M}from"./react-vendor-pwIkDrj-.js";import{a as D}from"./utils-Bah7aYMA.js";import{a as I,S as P}from"./ui-components-BtQ8AmL3.js";const H=D.create({baseURL:"http://localhost:3001",headers:{"Content-type":"application/json"}});H.interceptors.request.use(d=>d,d=>Promise.reject(d));const V=({onSubmit:d,onClose:p})=>{const[r,u]=c.useState({name:"",email:"",phone:"",company:"",message:""}),[o,n]=c.useState({name:"",email:"",phone:"",form:""}),j=t=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t),N=t=>/^\+?[\d\s-]{10,}$/.test(t),v=()=>{const t={};return r.name.trim()||(t.name="Name is required"),j(r.email)||(t.email="Valid email is required"),N(r.phone)||(t.phone="Valid phone number is required"),t},C=()=>{const t=v();return Object.keys(t).length===0?!0:(n(t),!1)},g=async()=>{if(C())try{if((await D.post("/api/contact",r)).status!==200)throw new Error("Failed to submit contact info");d(r)}catch(t){console.error("Error:",t),n({form:"Failed to submit contact info"})}},w=t=>{t.preventDefault(),g()};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:e.jsxs("div",{className:"bg-white rounded-lg p-8 max-w-md w-full relative",children:[e.jsx("button",{onClick:p,className:"absolute top-4 right-4 text-gray-500 hover:text-gray-700",type:"button",children:e.jsx(X,{className:"w-6 h-6"})}),e.jsx("h2",{className:"text-2xl font-bold text-gray-800 mb-6",children:"Contact Information"}),e.jsxs("form",{onSubmit:w,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Name *"}),e.jsx("input",{type:"text",required:!0,value:r.name,onChange:t=>{u(s=>({...s,name:t.target.value})),n(s=>({...s,name:""}))},className:`mt-1 w-full p-3 rounded-lg border text-gray-900 ${o.name?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote`,placeholder:"Enter your name",autoComplete:"name",id:"name"}),o.name&&e.jsx("p",{className:"text-red-500 text-sm mt-1",children:o.name})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Email *"}),e.jsx("input",{type:"email",required:!0,value:r.email,onChange:t=>{u(s=>({...s,email:t.target.value})),n(s=>({...s,email:""}))},className:`mt-1 w-full p-3 rounded-lg border text-gray-900 ${o.email?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote`,placeholder:"Enter your email",autoComplete:"email",id:"email"}),o.email&&e.jsx("p",{className:"text-red-500 text-sm mt-1",children:o.email})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Phone *"}),e.jsx("input",{type:"tel",required:!0,value:r.phone,onChange:t=>{u(s=>({...s,phone:t.target.value})),n(s=>({...s,phone:""}))},className:`mt-1 w-full p-3 rounded-lg border text-gray-900 ${o.phone?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote`,placeholder:"Enter your phone number",autoComplete:"tel",id:"phone"}),o.phone&&e.jsx("p",{className:"text-red-500 text-sm mt-1",children:o.phone})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Company"}),e.jsx("input",{type:"text",value:r.company,onChange:t=>u(s=>({...s,company:t.target.value})),className:"mt-1 w-full p-3 rounded-lg border text-gray-900 border-gray-300 focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote",placeholder:"Enter your company name",autoComplete:"organization",id:"company"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Message"}),e.jsx("textarea",{value:r.message,onChange:t=>u(s=>({...s,message:t.target.value})),className:"mt-1 w-full p-3 rounded-lg border text-gray-900 border-gray-300 focus:ring-2 focus:ring-dustup-quote focus:border-dustup-quote",placeholder:"Enter your message",id:"message"})]}),e.jsx("button",{type:"button",onClick:g,className:`w-full px-4 py-2 text-white rounded-lg transition-colors duration-200 
               ${isCaptchaVerified?"bg-dustup-quote hover:bg-dustup-quote-hover":"bg-gray-400 cursor-not-allowed"}`,children:"Continue to Calculator"})]})]})})};function W(){const d=M(),[p,r]=c.useState(!0),[u,o]=c.useState(!1),[n,j]=c.useState(null),[N,v]=c.useState({length:"",width:"",rafterRuns:"",rafterHeight:"",specialRequest:"",srCost:"",customDeliveryCost:""}),[C,g]=c.useState({noLiftNeeded:!1,poorLiftAccess:!1,duringOperation:!0,afterHours:!1,standardDelivery:!0,customDelivery:!1,selfDelivery:!1}),w=s=>{console.log("Contact form submitted:",s),j(s),r(!1)},t=({metrics:s,setMetrics:q,conditions:l,setConditions:f,contactInfo:R})=>{const F=()=>{const a=parseFloat(s.length),i=parseFloat(s.width),E=parseFloat(s.rafterHeight);if(isNaN(a)||isNaN(i)||isNaN(E))return{estimatedDays:0,laborCost:0,liftRentalCost:0,deliveryCost:0,total:0,cubicArea:0};const L=a*i,$=L*E;let O=l.duringOperation?400:540,m=Math.ceil(L/O),b=m*8*120,x=0,y=0;l.noLiftNeeded||(m<=5?x=120*m:m<=20?x=340*Math.ceil(m/5):x=950*Math.ceil(m/20),l.standardDelivery?y=150:l.customDelivery&&(y=parseFloat(s.customDeliveryCost)||0)),l.poorLiftAccess&&(b*=1.15),l.afterHours&&(b*=1.25);const Q=b+x+y;return{estimatedDays:m,laborCost:b,liftRentalCost:x,deliveryCost:y,total:Q,cubicArea:$}},[S,k]=c.useState({type:"",message:""}),A=async()=>{try{if((await H.post("/quote",{contactInfo:R,quoteData:F()})).status!==200)throw new Error("Failed to submit quote");k({type:"success",message:"Quote submitted successfully!"})}catch(a){console.error("Error:",a),k({type:"error",message:"Failed to submit quote"})}},h=F();return e.jsxs("div",{className:"space-y-6 bg-white text-gray-900 p-8 rounded-lg shadow-lg",children:[e.jsx("div",{className:"flex justify-between items-center",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(I,{className:"w-6 h-6 text-blue-500"}),e.jsx("h1",{className:"text-xl font-bold",children:"Quote Calculator"})]})}),e.jsxs("div",{className:"grid grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-semibold",children:"Facility Metrics"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("label",{className:"block text-sm",children:["Facility Length (ft)",e.jsx("input",{type:"number",value:s.length,onChange:a=>q(i=>({...i,length:a.target.value})),className:"w-full mt-1 p-2 border rounded"})]}),e.jsxs("label",{className:"block text-sm",children:["Facility Width (ft)",e.jsx("input",{type:"number",value:s.width,onChange:a=>q(i=>({...i,width:a.target.value})),className:"w-full mt-1 p-2 border rounded"})]}),e.jsxs("label",{className:"block text-sm",children:["Rafter Height (ft)",e.jsx("input",{type:"number",value:s.rafterHeight,onChange:a=>q(i=>({...i,rafterHeight:a.target.value})),className:"w-full mt-1 p-2 border rounded"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-semibold",children:"Conditions"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",checked:l.noLiftNeeded,onChange:()=>f(a=>({...a,noLiftNeeded:!a.noLiftNeeded})),className:"rounded border-gray-300"}),e.jsx("span",{className:"text-sm",children:"No Lift Required"})]}),e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",checked:l.poorLiftAccess,onChange:()=>f(a=>({...a,poorLiftAccess:!a.poorLiftAccess})),className:"rounded border-gray-300"}),e.jsx("span",{className:"text-sm",children:"Poor Lift Access"})]}),e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",checked:l.duringOperation,onChange:()=>{f(a=>({...a,duringOperation:!a.duringOperation,afterHours:a.duringOperation}))},className:"rounded border-gray-300"}),e.jsx("span",{className:"text-sm",children:"During Operation Hours"})]}),e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"checkbox",checked:l.afterHours,onChange:()=>{f(a=>({...a,afterHours:!a.afterHours,duringOperation:a.afterHours}))},className:"rounded border-gray-300"}),e.jsx("span",{className:"text-sm",children:"After Hours"})]})]})]})]}),e.jsxs("div",{className:"mt-8 p-6 bg-gray-50 rounded-lg",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Quote Summary"}),e.jsx("div",{className:"space-y-2",children:e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[e.jsxs("div",{children:[e.jsxs("p",{children:["Total Area: ",h.cubicArea.toFixed(0)," cubic ft"]}),e.jsxs("p",{children:["Estimated Duration: ",h.estimatedDays," days"]}),e.jsxs("p",{children:["Labor Cost: $",h.laborCost.toFixed(2)]})]}),e.jsxs("div",{children:[e.jsxs("p",{children:["Lift Rental Cost: $",h.liftRentalCost.toFixed(2)]}),e.jsxs("p",{children:["Delivery Cost: $",h.deliveryCost.toFixed(2)]}),e.jsxs("p",{className:"text-lg font-bold text-green-600 mt-2",children:["Total Quote: $",h.total.toFixed(2)]})]})]})})]}),e.jsx("form",{onSubmit:A,children:e.jsxs("button",{type:"submit",className:"flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200",children:[e.jsx(P,{className:"w-5 h-5"}),"Submit Quote"]})}),S.message&&e.jsx("p",{className:`mt-4 ${S.type==="success"?"text-green-600":"text-red-600"}`,children:S.message})]})};return e.jsx("div",{className:"min-h-screen bg-slate-900 py-8",children:e.jsxs("div",{className:"max-w-2xl mx-auto",children:[p&&e.jsx(V,{onSubmit:w,onClose:()=>d("/")}),!p&&!u&&n&&e.jsxs(e.Fragment,{children:[e.jsx(t,{metrics:N,setMetrics:v,conditions:C,setConditions:g,contactInfo:n}),e.jsxs("div",{className:"mt-4 text-center",children:[e.jsx("p",{className:"text-gray-600 mb-6",children:"Great, we will review the details and be in touch soon!"}),e.jsx("button",{onClick:()=>o(!1),className:"bg-dustup-quote text-primary-green font-semibold py-2 px-6 rounded-lg hover:bg-dustup-quote-hover transition-colors duration-200",type:"button",children:"Close"})]})]})]})})}export{W as default};
//# sourceMappingURL=Quote-aGrZzZs8.js.map
