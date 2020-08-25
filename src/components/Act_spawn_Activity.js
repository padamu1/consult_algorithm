/*
spawned Actor mv or cp
*/

import React from 'react';
import Act_spawn from './Act_spawn' 
const w_entity_Position = [1,1]
const w_arrows_Position = [2,1]
const w_switch_Position = [3,1]
const w_onoff_Position = [4,1]
const w_panel_Position = [5,1]
export function Act_spawn_mv (actor,position){
    switch(checkPosition){
        case 1: // just mv
            return (null)
        case 2: // mv and destroy
            return (null)
        case 3: // mv error doesn't do anything
            return (null)
    }   
}
export function Act_spawn_cp (actor,position){
    switch(canCopy){
        case 1: // copy possible
            return(null)
        case 2: // copy impossible 
            return (Act_spawn(actor))
    }
}
function checkPosition(toX,toY){

}
function canCopy(toX,toY){

}