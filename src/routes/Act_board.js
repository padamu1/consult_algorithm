import React from 'react'
import Act_spawn_mv from '../components/Act_spawn_mv'
import Act_spawn from '../components/Act_spawn'
import Act_train from '../components/Act_train'

class Act_board extends Component {
    make_board(){
        return(null)
    }
    make_act(w_spawn){
        return (Act_spawn(w_spawn))
    }
    cp_act(){
        return(null)
    }

}

export default Act_board;
