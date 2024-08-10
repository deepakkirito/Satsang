"use client"

import NewSevadaar from "@/component/pages/newsevadaar"

const { Box } = require("@mui/material")

const Page = ({params: {id}}) => {    
    return <Box marginTop={"6rem"}>
        <NewSevadaar id={id} />
    </Box>
}
export default Page