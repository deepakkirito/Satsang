"use client"

import View from "@/component/pages/view"

const { Box } = require("@mui/material")

const Page = ({params: {id}}) => {    
    return <Box marginTop={"6rem"}>
        <View id={id} />
    </Box>
}
export default Page