/*******************************************************************************
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of MIZAR.
 *
 * MIZAR is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MIZAR is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MIZAR. If not, see <http://www.gnu.org/licenses/>.
 ******************************************************************************/
/*global define: false */

/**
 * Compass module : map control with "north" component
 */
define(["jquery","./TimeTravelParams","../Utils/Constants"], function ($, TimeTravelParams, Constants) {

    /**
     *    Private variables
     */
    
    var params = new TimeTravelParams();

    var parentElement = null;
    var ctx = null;

    /**************************************************************************************************************/

    /**
     *    Go Rewind
     *    
     */
    function goRewind() {
        params.rewind();
    }

    /**
     *    Go Forward
     *    
     */
    function goForward() {
        params.forward();
    }

    /**
     *    Choose time
     *    
     */
    function chooseTime() {
        console.log("chooseTime");
    }

    /**************************************************************************************************************/

    /**
     *    Remove time travel element
     *    
     */
    function remove() {
        ctx.unsubscribe(Constants.EVENT_MSG.GLOBAL_TIME_FORWARD);
        ctx.unsubscribe(Constants.EVENT_MSG.GLOBAL_TIME_REWIND);
        ctx.unsubscribe(Constants.EVENT_MSG.GLOBAL_TIME_SET);
        document.getElementById(parentElement).innerHTML = '';
    }

    /**************************************************************************************************************/

    return {
        init: function (options) {
            parentElement = options.element;
            ctx = options.ctx;

            params.setContext(ctx);
            params.setStartDate([2012,0,1]);
            params.setEndDate([2017,0,1]);
            params.setCurrentDate([2012,0,1]);
            params.setStep(TimeTravelParams.STEP.YEAR,1);
            
            // subscribe
            ctx.subscribe(Constants.EVENT_MSG.GLOBAL_TIME_FORWARD,goForward);
            ctx.subscribe(Constants.EVENT_MSG.GLOBAL_TIME_REWIND,goRewind);
            ctx.subscribe(Constants.EVENT_MSG.GLOBAL_TIME_SET,chooseTime);
        },
        goForward   : goForward,
        goRewind    : goRewind,
        chooseTime  : chooseTime,
        remove      : remove
    };
});
