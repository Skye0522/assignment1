const { creareApp, ref, onMounted } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify();
Vue.createApp({
  setup() {
    //掲載要素を定義
    const txtTitle = ref("タイトル");
    const locate = ref("場所");
    const ymd = ref("日付");
    const pict = ref("画像");
    const txtMain = ref("本文");
    //axios APIからデータを取得
    onMounted(function(){
    axios.get("https://images-api.nasa.gov/search?q=hubble%20galaxy")
    //取得成功時       
            .then(function(response)
    {
    //取得データをランダム抽出
     const item =
     response.data.collection.items;
     const random = 
     Math.floor(Math.random() * item.length);
     const content = item[random];
     //取得データタイトルをログ表示
     console.log(content.data[0].title);
      //取得データを定義した変数に格納
     txtTitle.value = content.data[0].title;
     ymd.value = content.data[0].date_created;
     pict.value= content.links[0].href;
     txtMain.value= content.data[0].description;
     locate.value= content.data[0].location;
   })
   //エラー時　ログ表示
           .catch(function(error)
  {console.log(error);}
                 )     
  })
    //ページ先頭へ戻るボタン
    function backbtn() {
      window.scrollTo({
        top:0,behavior:"smooth"
      });
    }
    return { txtTitle,locate,ymd,pict,txtMain,backbtn};
  },
}).use(vuetify).mount('#app');