import Vue from 'vue'

export const EventBus = new Vue()

// ==
// USES EXEMPLES
// ==


// EMIT EVENT

// Send the event on a channel (event_name) with a payload (a msg for exemple)
// EventBus.$emit('event_name', 'toto va à la plage');




// LISTEN EVENT

// The vent handler function
// const clickHandler = function(msg) {
//     console.log(msg)
// }


// Listen for the event_name event and its payload.
// EventBus.$on('event_name', clickHandler)

// Stop listening event
// EventBus.$off('event_name', clickHandler)
