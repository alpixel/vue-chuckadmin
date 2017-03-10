<script>
    import Vue from 'vue'
    import moment from 'moment'

    /*
        {{ "2013-02-19 03:59:52 | frenchDate }} => "19.02.2013"
    */
    Vue.filter('formatDate',function(date, locale, format){
        if (!format) {
            return moment(date).format('MMMM Do YYYY')
        } else {
            return moment(date).locale(locale).format(format)
        }
    })

    /*
        {{ "coucou" | upper }} => "COUCOU"
    */
    Vue.filter('upper',function(str){
        return str.toUpperCase()
    })

    /*
        {{ "coucou" | capitalize }} => "Coucou"
    */
    Vue.filter('capitalize',function(str){
        return str.charAt(0).toUpperCase() + str.slice(1)
    })
</script>
