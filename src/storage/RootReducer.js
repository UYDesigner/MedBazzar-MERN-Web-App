import Cookies from "js-cookie";
const initailState = {
  data: {},
  user: {}

}
function RootReducer(state = initailState, action) {
  switch (action.type) {

    case "ADD_USER":
      state.user[action.payload[0]] = action.payload[1]

      return { data: state.data, user: state.user }

    case "DELETE_USER":
      delete state.user[action.payload[0]]
      return { data: state.data, user: state.user }

    case "ADD_PRODUCT":
      state.data[action.payload[0]] = action.payload[1]
      // console.log("Addingggggggggggg",state.data);
      Cookies.set("CART", JSON.stringify(state.data), {expires:365})
      return { data: state.data, user: state.user }
    case "DELETE_PRODUCT":
      delete state.data[action.payload[0]]
      Cookies.set("CART", JSON.stringify(state.data), {expires:365})
      return { data: state.data, user: state.user }

    default:
      return { data: state.data, user: state.user }
  }
}

export default RootReducer