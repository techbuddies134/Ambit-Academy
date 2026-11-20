"use client";
import {Box,ArrowUpRight} from 'lucide-react';
import {useExperience} from './experience';
export function TourButton(){const {openTour}=useExperience();return <button className="btn secondary" onClick={openTour}><Box size={16}/>Open classroom tour <ArrowUpRight size={15}/></button>;}
