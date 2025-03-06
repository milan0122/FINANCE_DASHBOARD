import {useState} from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography,useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';


type Props = {};

const Navbar = (_props: Props) => {
    const {platte} = useTheme();
    return <FlexBetween mb="0.25rem" p="0.5rem 0rem"></FlexBetween>
}

export default Navbar;