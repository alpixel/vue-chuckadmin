webpackJsonp([2],{194:function(t,r,e){var s=e(3)(e(235),e(239),null,null);t.exports=s.exports},235:function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=e(4),a=e.n(s),i="https://randomuser.me/api/?id="+this.id+"&nat=fr";r.default={name:"admin-profile",data:function(){return{loading:!0,fetchError:"",user:[]}},props:{id:null},head:{title:function(){return{inner:"User profil",separator:"-",complement:"Made by ALPIXEL agency"}},meta:function(){return[]}},watch:{$route:"fetchData"},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.loading=!0,this.fetchError=null,a.a.axios.get(i,{}).then(function(r){r.data.error?t.showError("data.error : JSON file return an error value"):(t.loading=!1,t.user=r.data.results[0])}).catch(function(r){t.showError("JSON file not found")})},showError:function(t){this.fetchError=t,this.loading=!1,this.user=[]}}}},239:function(t,r){t.exports={render:function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"user-profil"},[t.loading?e("div",{staticClass:"cc-loader"},[e("div",{staticClass:"spinner"})]):e("div",[t.fetchError?e("div",{staticClass:"alert alert-error"},[t._v("\n            "+t._s(t.fetchError)+"\n        ")]):e("div",[e("div",{staticClass:"top-page"},[e("div",{staticClass:"cc-inside"},[e("div",{staticClass:"columns"},[e("h1",[t._v("\n                            User \n                            "),e("small",[t._v("• #"+t._s(t.user.id.value)+" ")])]),t._v(" "),e("div",{staticClass:"cc-w-auto cc-right"},[e("router-link",{staticClass:"btn cc-bg-green fa-angle-left",attrs:{to:{name:"users"}}},[t._v("Back to users")])],1)])])]),t._v(" "),e("div",{staticClass:"cc-inside"},[e("div",{staticClass:"boxed"},[e("pre",[t._v(t._s(t.user))])])])])])])},staticRenderFns:[]}}});
//# sourceMappingURL=2.build.js.map