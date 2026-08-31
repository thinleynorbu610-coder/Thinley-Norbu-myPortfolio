/* ══════════════════════════════════════════════════════════
   CONTENT — edit these arrays, nothing else. This is the only
   file you need to touch to change text.

   Adding images — two ways:
   1. Quick/local: on the live page, click any "Add screenshot"
      or "Add certificate image" tile and pick a file. It's
      saved in that browser's storage — great for previewing,
      but only you (on that device) see it; other visitors
      still see the placeholder.
   2. Permanent, for every visitor:
      - Drop a project screenshot in images/projects/, then set
        that project's "image" field below to its path, e.g.
        image:"images/projects/quickbite.png"
      - Drop a certificate scan/photo in images/certificates/
        and set that cert's "image" field the same way.
      - Your profile photo lives at images/profile/crest.png —
        replace that file (keep the same name) to swap the
        crest for a real photo; no code change needed.
   Leave an "image" field as null to keep the placeholder.
   ══════════════════════════════════════════════════════════ */
const DATA = {
  stats: [
    {n:"12+",l:"Projects Built"},{n:"15+",l:"Technologies Learned"},
    {n:"8+",l:"Certificates"},{n:"3",l:"Currently Learning"}
  ],
  timeline: [
    {year:"2024",title:"Started exploring programming",desc:"First lines of code. Broke a lot of things.",done:true},
    {year:"2025",title:"Started building web projects",desc:"HTML, CSS, JavaScript — then actual deployed sites.",done:true},
    {year:"2026",title:"Developing full-stack projects",desc:"Go and PostgreSQL on the back, React on the front.",done:true},
    {year:"Future",title:"Professional software developer",desc:"Shipping products people rely on.",done:false}
  ],
  projects: [
    {title:"BhutanCare",category:"Web",status:"wip",statusLabel:"In progress",
     desc:"A digital healthcare platform improving hospital appointment booking and patient access to health services.",
     tech:["HTML","CSS","JavaScript","Go","PostgreSQL","Docker"],image:null,github:"#",demo:"#",details:"#"},
    {title:"QuickBite",category:"Web",status:"live",statusLabel:"Live",
     desc:"QR-based canteen ordering. Students scan a code, browse the menu, and order without queuing.",
     tech:["JavaScript","Node.js","PostgreSQL"],image:null,github:"#",demo:"#",details:"#"},
    {title:"Tourism Data Analysis",category:"Data",status:"live",statusLabel:"Complete",
     desc:"Statistical analysis of tourist arrival trends in Bhutan, with visualisations of seasonality and origin markets.",
     tech:["Python","Pandas","Matplotlib"],image:null,github:"#",demo:null,details:"#"},
    {title:"Appointment UI Concept",category:"UI/UX",status:"live",statusLabel:"Design",
     desc:"Figma exploration for BhutanCare booking — problem framing, wireframes, and a tested final design.",
     tech:["Figma","Prototyping"],image:null,github:null,demo:"#",details:"#"},
    {title:"Inventory REST API",category:"Backend",status:"wip",statusLabel:"In progress",
     desc:"A Go service with auth, role-based access, and a normalised Postgres schema.",
     tech:["Go","PostgreSQL","JWT","Docker"],image:null,github:"#",demo:null,details:"#"},
    {title:"Database Systems Project",category:"Academic",status:"live",statusLabel:"Submitted",
     desc:"Coursework building a normalised schema for a library system, with triggers, views and query optimisation.",
     tech:["PostgreSQL","SQL"],image:null,github:"#",demo:null,details:"#"}
  ],
  stack: [
    {group:"Frontend",items:[
      {name:"HTML",level:"Confident",note:"Semantic structure, accessibility, forms.",used:"Every project"},
      {name:"CSS",level:"Confident",note:"Flexbox, Grid, responsive layouts, custom properties.",used:"Every project"},
      {name:"JavaScript",level:"Working",note:"DOM, events, async/await, fetch and APIs.",used:"QuickBite, BhutanCare"},
      {name:"Bootstrap",level:"Working",note:"Fast prototyping before moving to custom CSS.",used:"Early projects"},
      {name:"React",level:"Learning",note:"Components, props, state, hooks.",used:"This website"}]},
    {group:"Backend",items:[
      {name:"Go",level:"Working",note:"HTTP handlers, routing, middleware, JSON APIs.",used:"BhutanCare"},
      {name:"Node.js",level:"Working",note:"Express routing and REST endpoints.",used:"QuickBite"}]},
    {group:"Database",items:[
      {name:"PostgreSQL",level:"Working",note:"Schema design, joins, normalisation, CRUD, indexes.",used:"Most backend projects"}]},
    {group:"Tools",items:[
      {name:"Git",level:"Confident",note:"Branching, commits, merge conflicts, history.",used:"Everything"},
      {name:"GitHub",level:"Confident",note:"Pull requests, issues, collaboration, Pages.",used:"Everything"},
      {name:"VS Code",level:"Confident",note:"Extensions, debugger, integrated terminal.",used:"Daily"},
      {name:"Docker",level:"Learning",note:"Containers, images, compose, volumes.",used:"BhutanCare"}]},
    {group:"Design",items:[
      {name:"Figma",level:"Working",note:"Wireframes, components, auto layout, prototyping.",used:"UI/UX work"}]}
  ],
  skills: [
    {name:"HTML",pct:90},{name:"CSS",pct:85},{name:"JavaScript",pct:70},
    {name:"Go",pct:60},{name:"PostgreSQL",pct:60},{name:"Docker",pct:50}
  ],
  logs: [
    {topic:"REST APIs",category:"Backend",date:"August 2026",status:"Completed",difficulty:3,
     learned:"Resource naming, HTTP verbs and status codes, and why statelessness matters for scaling.",
     applied:"Rebuilt the Inventory API with proper routes and consistent error responses.",
     next:"Pagination, rate limiting, and API versioning.",tech:["Go","JSON","Postman"]},
    {topic:"HTML & CSS",category:"Frontend",date:"March 2025",status:"Completed",difficulty:1,
     learned:"Semantic HTML, responsive layouts, Flexbox and Grid, and modern CSS custom properties.",
     applied:"Built my first three sites without a framework, mobile-first.",
     next:"Container queries and CSS nesting.",tech:["HTML","CSS"]},
    {topic:"JavaScript",category:"Programming",date:"July 2025",status:"Completed",difficulty:3,
     learned:"DOM manipulation, event handling, fetch, promises and async/await.",
     applied:"Made QuickBite menus load and update without a page refresh.",
     next:"Modules, bundling, and TypeScript.",tech:["JavaScript"]},
    {topic:"Git & GitHub",category:"DevOps",date:"May 2025",status:"Completed",difficulty:2,
     learned:"Version control, branching strategy, commits, pull requests, resolving conflicts.",
     applied:"Every project since. Recovered work I would otherwise have lost, twice.",
     next:"GitHub Actions and CI pipelines.",tech:["Git","GitHub"]},
    {topic:"PostgreSQL",category:"Database",date:"January 2026",status:"Completed",difficulty:3,
     learned:"Database design, normalisation, joins, relationships, CRUD, and basic indexing.",
     applied:"Designed the BhutanCare appointment schema so double-booking is impossible at the DB level.",
     next:"Query plans, transactions and isolation levels.",tech:["PostgreSQL","SQL"]},
    {topic:"UI/UX Fundamentals",category:"UI/UX",date:"April 2026",status:"In progress",difficulty:2,
     learned:"Visual hierarchy, spacing systems, and testing a design with real users before building it.",
     applied:"Redesigned the BhutanCare booking flow after watching three people fail at it.",
     next:"Accessibility auditing and design systems.",tech:["Figma"]}
  ],
  notes: [
    {title:"Undo the last commit, keep the changes",cat:"Git",fav:true,
     body:"Rewinds the last commit but leaves your files alone. The one I actually use.",
     code:"git reset --soft HEAD~1",tags:["git","commands"]},
    {title:"The N+1 query problem",cat:"Database",fav:true,
     body:"Looping over rows and querying inside the loop turns 1 query into 101. Use a join or a single WHERE IN.",
     code:null,tags:["postgres","performance"]},
    {title:"Centre anything with Grid",cat:"CSS",fav:false,
     body:"Two lines. Works regardless of the child size.",
     code:"display: grid;\nplace-items: center;",tags:["css","layout"]},
    {title:"Go error handling habit",cat:"Go",fav:false,
     body:"Wrap errors with context as they travel up, so the log tells you where it actually broke.",
     code:'if err != nil {\n  return fmt.Errorf("fetch user: %w", err)\n}',tags:["go","errors"]},
    {title:"Mistake: I stored passwords as plain text",cat:"Lessons",fav:true,
     body:"In my first login form. Hash with bcrypt, always, and never invent your own auth scheme.",
     code:null,tags:["security","mistakes"]},
    {title:"Kill the process on a busy port",cat:"Terminal",fav:false,
     body:"When the server says the port is already in use.",
     code:"lsof -ti:3000 | xargs kill -9",tags:["terminal","commands"]},
    {title:"Idea: offline-first for weak connections",cat:"Ideas",fav:false,
     body:"Campus wifi drops constantly. A service worker plus a local cache would make most of my apps usable anyway.",
     code:null,tags:["ideas","pwa"]},
    {title:"Semantic HTML is free accessibility",cat:"CSS",fav:false,
     body:"A button element gets keyboard support, focus and screen reader roles for nothing. A styled div gets none of it.",
     code:null,tags:["html","a11y"]}
  ],
  certs: [
    {name:"Responsive Web Design",org:"freeCodeCamp",date:"2025",cat:"Certificates",skills:["HTML","CSS"],image:null},
    {name:"JavaScript Algorithms",org:"freeCodeCamp",date:"2025",cat:"Certificates",skills:["JavaScript"],image:null},
    {name:"Git & GitHub Essentials",org:"Coursera",date:"2025",cat:"Certificates",skills:["Git"],image:null},
    {name:"SQL for Data Analysis",org:"Coursera",date:"2026",cat:"Certificates",skills:["SQL"],image:null},
    {name:"College Hackathon",org:"GCIT",date:"2026",cat:"Competitions",skills:["Teamwork"],image:null},
    {name:"Dean's List",org:"GCIT",date:"2025",cat:"Academic",skills:["Academics"],image:null}
  ],
  road: [
    {name:"Programming Foundations",state:"done"},{name:"HTML & CSS",state:"done"},
    {name:"JavaScript",state:"done"},{name:"Frontend Development",state:"done"},
    {name:"Backend Development",state:"now"},{name:"Databases",state:"now"},
    {name:"Full-Stack Development",state:"next"},{name:"DevOps",state:"next"},
    {name:"Professional Developer",state:"next"}
  ]
};
