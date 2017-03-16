webpackJsonp([1],{195:function(e,t,s){var r=s(3)(s(236),s(244),null,null);e.exports=r.exports},226:function(e,t,s){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,s=Array(e.length);t<e.length;t++)s[t]=e[t];return s}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"pagination",props:{records:{type:Number,required:!0},numberPerPage:{type:Number,required:!1,default:10},currentpage:{required:!1,validator:function(e){return _.toNumber(e)}}},data:function(){return{current:1,gap:2,pagination:[]}},created:function(){this.createPagination()},computed:{showLeft:function(){return this.current>1},showRight:function(){return this.current<this.totalPages()}},watch:{numberPerPage:function(){this.current=1,this.createPagination()},records:function(){this.current=1,this.createPagination()},current:function(){this.current=this.current<1?1:this.current,this.createPagination()},currentpage:function(){this.current=this.currentpage<1?1:this.currentpage}},methods:{changePage:function(e){this.pagination[e].disabled||(this.current=this.pagination[e].text,this.$emit("changepage",this.current))},createPagination:function(){var e=this.totalPages();this.pagination=[];var t=2*this.gap;e<5+t?this.addPages.apply(this,r(_.range(1,e+1))):this.current<2+t?(this.addPages.apply(this,r(_.range(1,4+t))),this.addTroncature(),this.addLastPages(e)):t+1<this.current&&this.current<e-t?(this.addFirstPages(),this.addTroncature(),this.addPages.apply(this,r(_.range(this.current-this.gap,this.current+this.gap+1))),this.addTroncature(),this.addLastPages(e)):(this.addFirstPages(),this.addTroncature(),this.addPages.apply(this,r(_.range(e-2-t,e+1))))},addTroncature:function(){this.pagination.push({text:"...",active:!1,disabled:!0})},addFirstPages:function(){this.addPages(1,2)},addLastPages:function(e){this.addPages(e-1,e)},addPages:function(){for(var e=this,t=arguments.length,s=Array(t),r=0;r<t;r++)s[r]=arguments[r];_.forEach(s,function(t){e.pagination.push({text:t,active:e.current==t,disabled:!1})})},totalPages:function(){return _.ceil(this.records/this.numberPerPage)},goPrev:function(){this.$emit("changepage",--this.current)},goNext:function(){this.$emit("changepage",++this.current)},goFirst:function(){this.current=1,this.$emit("changepage",this.current)},goLast:function(){this.current=this.totalPages(),this.$emit("changepage",this.current)}}}},227:function(e,t,s){var r=s(3)(s(226),s(228),null,null);e.exports=r.exports},228:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return this.records>this.numberPerPage?s("ul",{staticClass:"tabs cc-pills",attrs:{id:"pagination"}},[s("li",{class:[{disabled:!e.showLeft}],on:{click:e.goFirst}},[s("a",[e._v("<<")])]),e._v(" "),s("li",{class:[{disabled:!e.showLeft}],on:{click:e.goPrev}},[s("a",[e._v("<")])]),e._v(" "),e._l(e.pagination,function(t,r){return s("li",{class:{active:t.active,disabled:t.disabled}},[s("a",{on:{click:function(t){e.changePage(r)}}},[e._v("\n            "+e._s(t.text)+"\n        ")])])}),e._v(" "),s("li",{class:[{disabled:!e.showRight}],on:{click:e.goNext}},[s("a",[e._v(">")])]),e._v(" "),s("li",{class:[{disabled:!e.showRight}],on:{click:e.goLast}},[s("a",[e._v(">>")])])],2):e._e()},staticRenderFns:[]}},236:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(4),a=s.n(r),n=s(227),i=s.n(n);t.default={name:"users",data:function(){return{loading:!0,fetchError:"",showModal:!1,sortType:["desc","asc"],sortKey:"registered",searchQuery:"",users:[],usersFiltered:[],userShown:[],userToDelete:{},currentPage:1,nbPerPage:10,nbPerPageSelect:10}},head:{title:function(){return{inner:"Users panel",separator:"-",complement:"Made by ALPIXEL agency"}},meta:function(){return[]}},computed:{maxUsers:function(){return this.usersFiltered.length}},watch:{$route:"fetchData",nbPerPageSelect:function(){this.nbPerPage=_.toInteger(this.nbPerPageSelect),this.currentPage=1,this.refreshPage()},searchQuery:function(){this.searchInTable()},userShown:function(){this.userShown.length<1&&this.usersFiltered.length>0&&this.users.length>0&&(this.currentPage=1,this.refreshPage())},currentPage:function(){this.changePage(this.currentPage)}},created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;this.fetchError="",this.loading=!0,a.a.axios.get("https://randomuser.me/api/?results=50&nat=fr",{}).then(function(t){t.data.error?e.showError("data.error : JSON file return an error value"):(e.loading=!1,e.users=t.data.results,e.usersFiltered=t.data.results,e.userShown=e.usersFiltered.slice(0,e.nbPerPage),e.sortBy(e.sortKey))}).catch(function(t){e.showError("JSON file not found")})},showError:function(e){this.fetchError=e,this.loading=!1,this.users=[],this.usersFiltered=[]},changePage:function(e){this.currentPage=e,this.refreshPage()},refreshPage:function(){var e=this.getStartPagination();this.userShown=this.usersFiltered.slice(e,e+this.nbPerPage)},getStartPagination:function(){return(this.currentPage-1)*this.nbPerPage},sortBy:function(e){this.usersFiltered=_.orderBy(this.usersFiltered,e,[this.sortType[0]]),this.sortType=_.reverse(this.sortType),this.sortKey=e,this.refreshPage()},searchInTable:function(){var e=this,t=_.filter(e.users,function(t){return _.includes(t.name.first.toLowerCase(),e.searchQuery.toLowerCase())||_.includes(t.name.last.toLowerCase(),e.searchQuery.toLowerCase())||_.includes(t.id.value,e.searchQuery.toLowerCase())});e.usersFiltered=t,this.currentPage=1,e.refreshPage()},openModal:function(e,t){var s=this.userShown[t];this.userToDelete={index:t,id:e,firstname:s.name.first,lastname:s.name.last},this.showModal=!0},deleteUser:function(){var e=this.userToDelete.id,t=this.userToDelete.index,s=_.findIndex(this.users,function(t){return t.id.value==e});this.users.splice(s,1),this.userShown.splice(t,1);var r=_.findIndex(this.usersFiltered,function(t){return t.id.value==e});this.usersFiltered.splice(r,1),this.showModal=!1,this.userToDelete={}}},filters:{pluralize:function(e){return e>1?e+" users found":e+" user found"}},components:{Pagination:i.a}}},244:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"users-home"},[e.loading?s("div",{staticClass:"cc-loader"},[s("div",{staticClass:"spinner"})]):s("div",[e.fetchError?s("div",[s("div",{staticClass:"top-page"},[s("div",{staticClass:"cc-inside"},[s("div",{staticClass:"columns"},[s("h1",[e._v("\n                            Users \n                        ")])])])]),e._v(" "),s("div",{staticClass:"cc-inside"},[s("div",{staticClass:"alert alert-error"},[e._v("\n                    "+e._s(e.fetchError)+"\n                ")])])]):s("div",[s("div",{staticClass:"top-page"},[s("div",{staticClass:"cc-inside"},[s("div",{staticClass:"columns"},[s("h1",[e._v("\n                            Users \n                            "),s("small",[e._v("• "+e._s(e._f("pluralize")(e.maxUsers))+" •")])]),e._v(" "),s("div",{staticClass:"cc-w-auto cc-right"},[s("router-link",{staticClass:"btn cc-bg-purple fa-plus",attrs:{to:{name:"user-add"}}},[e._v("Add a user")])],1)])])]),e._v(" "),s("div",{staticClass:"cc-inside"},[s("div",{staticClass:"filters boxed"},[s("form",{staticClass:"columns"},[s("div",{staticClass:"form-item cc-txt-center cc-w-auto"},[s("div",{staticClass:"form-ps"},[s("span",[e._v("Search")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.searchQuery,expression:"searchQuery"}],attrs:{type:"text",placeholder:"Search by names, ID"},domProps:{value:e.searchQuery},on:{input:function(t){t.target.composing||(e.searchQuery=t.target.value)}}})])]),e._v(" "),s("div",{staticClass:"form-item  cc-txt-center cc-w-auto cc-right"},[s("div",{staticClass:"form-ps"},[s("span",[e._v("Nb per page")]),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.nbPerPageSelect,expression:"nbPerPageSelect"}],on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.nbPerPageSelect=t.target.multiple?s:s[0]}}},[s("option",{attrs:{value:"1"}},[e._v("1 ligne")]),e._v(" "),s("option",{attrs:{value:"5"}},[e._v("5 lignes")]),e._v(" "),s("option",{attrs:{value:"10"}},[e._v("10 lignes")]),e._v(" "),s("option",{attrs:{value:"20"}},[e._v("20 lignes")]),e._v(" "),s("option",{attrs:{value:"50"}},[e._v("50 lignes")])])])]),e._v(" "),e.maxUsers>e.nbPerPage?s("div",{staticClass:"form-item cc-txt-center cc-w-auto"},[s("div",{staticClass:"form-ps"},[s("span",[e._v("Go to page")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model.number",value:e.currentPage,expression:"currentPage",modifiers:{number:!0}}],staticClass:"small",attrs:{type:"number",min:"1"},domProps:{value:e.currentPage},on:{input:function(t){t.target.composing||(e.currentPage=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}})])]):e._e()])]),e._v(" "),s("pagination",{staticClass:"cc-w-auto",attrs:{records:e.maxUsers,currentpage:e.currentPage,"number-per-page":e.nbPerPage},on:{changepage:e.changePage}}),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.userShown.length>=1,expression:"userShown.length >= 1"}],staticClass:"boxed cc-ma-0"},[s("table",{staticClass:"cc-equal-cols"},[s("thead",[s("tr",[s("th",{class:[{active:"id.value"==e.sortKey},e.sortType[0],"sort"],on:{click:function(t){e.sortBy("id.value")}}},[e._v("\n                                    ID\n                                ")]),e._v(" "),s("th",[e._v("\n                                    Picture\n                                ")]),e._v(" "),s("th",{class:[{active:"name.first"==e.sortKey},e.sortType[0],"sort"],on:{click:function(t){e.sortBy("name.first")}}},[e._v("\n                                    Firstname\n                                ")]),e._v(" "),s("th",{class:[{active:"name.last"==e.sortKey},e.sortType[0],"sort"],on:{click:function(t){e.sortBy("name.last")}}},[e._v("\n                                    Lastname\n                                ")]),e._v(" "),s("th",{class:[{active:"registered"==e.sortKey},e.sortType[0],"sort"],on:{click:function(t){e.sortBy("registered")}}},[e._v("\n                                    Date inscription\n                                ")]),e._v(" "),s("th",[e._v("\n                                    Action\n                                ")])])]),e._v(" "),s("tfoot",[s("tr",[s("th",[e._v("\n                                    ID\n                                ")]),e._v(" "),s("th",[e._v("\n                                    Picture\n                                ")]),e._v(" "),s("th",[e._v("\n                                    Firstname\n                                ")]),e._v(" "),s("th",[e._v("\n                                    Lastname\n                                ")]),e._v(" "),s("th",[e._v("\n                                    Date inscription\n                                ")]),e._v(" "),s("th",[e._v("\n                                    Action\n                                ")])])]),e._v(" "),s("tbody",e._l(e.userShown,function(t,r){return s("tr",[s("td",[e._v("\n                                    "+e._s(t.id.value)+"\n                                ")]),e._v(" "),s("td",[s("img",{attrs:{src:t.picture.thumbnail,alt:t.name.first}})]),e._v(" "),s("td",[e._v("\n                                    "+e._s(e._f("capitalize")(t.name.first))+"\n                                ")]),e._v(" "),s("td",[e._v("\n                                    "+e._s(e._f("upper")(t.name.last))+"\n                                ")]),e._v(" "),s("td",[e._v("\n                                    "+e._s(e._f("formatDate")(t.registered,"fr","[Le] DD.MM.YYYY"))+"\n                                ")]),e._v(" "),s("td",[s("router-link",{staticClass:"btn cc-bg-primary fa-edit",attrs:{to:{name:"user-profile",params:{id:t.id.value}}}},[e._v("Edit")]),e._v(" "),s("a",{staticClass:"btn cc-thin cc-bg-red fa-times",on:{click:function(s){s.preventDefault(),e.openModal(t.id.value,r)}}},[e._v("Del.")])],1)])}))],1)]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.userShown.length<1,expression:"userShown.length < 1"}],staticClass:"alert alert-error"},[e._v("\n                    No users found, please change your filters\n                ")]),e._v(" "),s("div",{class:[{active:e.showModal},"modal"]},[s("button",{staticClass:"modal-close",on:{click:function(t){e.showModal=!1}}}),e._v(" "),s("div",{staticClass:"modal-overlay",on:{click:function(t){e.showModal=!1}}}),e._v(" "),s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[e._v("\n                            Confirm action\n                        ")]),e._v(" "),s("div",{staticClass:"modal-body"},[s("div",{staticClass:"alert alert-info"},[e._v("\n                                Do you really want to delete the user "),e.userToDelete.firstname?s("strong",[e._v(e._s(e._f("capitalize")(e.userToDelete.firstname))+" "+e._s(e._f("upper")(e.userToDelete.lastname)))]):e._e(),e._v(" ?\n                                ")])]),e._v(" "),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"cc-bg-red fa-check",on:{click:function(t){t.preventDefault(),e.deleteUser(t)}}},[e._v("DELETE THIS USER")])])])])],1)])])])},staticRenderFns:[]}}});
//# sourceMappingURL=1.build.js.map