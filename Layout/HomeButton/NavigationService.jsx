import { NavigationActions } from "react-navigation";

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator
};
