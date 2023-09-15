import { Button as ChakraButton, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const Button = ({ variant, children, ...rest }) => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <ChakraButton
            as={motion.button}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.9 }}
            _hover={{
                shadow: "md",
            }}
            onClick={() => setIsClicked(!isClicked)}
            {...rest}
        >
            {children}
        </ChakraButton>
    )
}

export default Button