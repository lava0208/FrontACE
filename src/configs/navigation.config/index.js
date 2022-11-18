import appsNavigationConfig from "./apps.navigation.config";
import authNavigationConfig from "./auth.navigation.config";

const navigationConfig = [...appsNavigationConfig, ...authNavigationConfig];

export default navigationConfig;
