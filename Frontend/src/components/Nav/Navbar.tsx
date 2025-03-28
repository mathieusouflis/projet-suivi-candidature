import { Link } from "react-router";
import { Button } from "../ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";

const Navbar = () => {
  return (
    <NavigationMenu className="p-2">
      <NavigationMenuList>
        <Link to="/">
        <NavigationMenuItem>
          <Button variant="outline">Home</Button>
        </NavigationMenuItem>
        </Link>
        <Link to="/auth/login">
          <NavigationMenuItem>
          <Button variant="outline">Log In</Button>
          </NavigationMenuItem>
        </Link>
        <Link to="/auth/register">
          <NavigationMenuItem>
          <Button variant="outline">Register</Button>
          </NavigationMenuItem>
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
