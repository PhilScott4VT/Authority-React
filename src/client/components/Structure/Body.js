/**
 * Component used for creating main, transferrable outline for game.
 */

import React, { useState, useEffect, useContext } from 'react';
import NavBar from './NavBar'; 
import { Row, Col } from 'react-bootstrap';
import '../../css/main.css';

export default function Body(props){
    let middleColWidth = 8;
    if (props.middleColWidth) {
        middleColWidth = props.middleColWidth;
    }

    return(
        <>
                <NavBar/>  
                <div className="main">
                    <div className="gameContainer">
                        <Row>  
                            <Col sm/>
                            <Col sm={middleColWidth}>
                                {props.children}
                            </Col>
                            <Col sm/>
                        </Row>
                    </div>
                    <div className="footerBar">
                        <p>
                            Developed by Phil Scott
                            <br/>
                            This is a WIP game.
                        </p>
                    </div>
                </div>
        </>
    )
}