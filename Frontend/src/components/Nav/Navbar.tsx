import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <NavigationMenu className="p-2">
      <NavigationMenuList>

        <NavigationMenuItem>
          <Button variant="outline">Home</Button>
        </NavigationMenuItem>
          <NavigationMenuItem>
          <Button variant="outline">Log In</Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <Button variant="outline">Register</Button>
          </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
