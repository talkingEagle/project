// THis class manipulates a given camera's position and lookat position
ThirdPersonCamera = new function(camera) {
    this.camera = camera;
    this.currentPosition = new THREE.Vector3();
    this.currentLookat = new THREE.Vector3();
};



ThirdPersonCamera.prototype.update = function(intervals, head, direction) {
    //////////////////////////////////////////////////////////
    /// Calcualte the Position of the Third Person Camera ////
    //////////////////////////////////////////////////////////

    // Update the camera's current Position by popping the first element
    // in the intervals array to get an _interval object.
    var interval = intervals.shift();

    // The cube that neighbors a wall where collision is detected
    var enter = interval.wallEntrance;

    // The cube that neighbors a wall that directly opposes the wall where collision is detected
    var exit = interval.wallExit;

    // the final position is the final vector position the camera needs to
    // arrive that upon the snake turning
    var finalPosition = interval.newPostion;

    // Comparator vector
    var comparator = new THREE.Vector3();


    // Calculate the step the camera must take in the current frame:

    // If wall collision is detected, then do the following:
    // Get the steps from the camera's current position to the cube neighboring the wall:
    if (interval.cubesPriorWall != 0) {
        // translation will not be completed as we consider the overall cubes on the path.
        var step = new THREE.Vector3(
            ((enter.x - this.currentPosition.x) / interval.remainingCubes) +
            ((enter.x - this.currentPosition.x) % interval.remainingCubes),
            ((enter.y - this.currentPosition.y) / interval.remainingCubes) +
            ((enter.y - this.currentPosition.y) % interval.remainingCubes),
            ((enter.z - this.currentPosition.z) / interval.remainingCubes) +
            ((enter.z - this.currentPosition.z) % interval.remainingCubes)
        );
        // There are less cubes to transition to when heading towards the wall
        interval.cubesPriorWall--;
    }
    // After all preceding cubes prior a wall has been traversed, for a single frame, the
    // camera must jump to the cube that comes right after the oppossing wall, to make this
    // jump subtract the wallExit vector, "exit", by the current position of the camera, this will
    // create a huge leap, but it's necessary.
    else if ((interval.cubesPriorWall == 0) && (!(interval.wallExit.equals(comparator))) ) {
        // Subtract the components of the exit and enter vectors.
        // There will be a single component that has value while the others are of value 0
        var jump = new THREE.Vector3(
            exit.x - enter.x,
            exit.y - enter.y,
            exit.z - enter.z
        );

        // get a copy of the currentPosition
        var temp = new THREE.Vector3();
        temp.copy(this.currentPosition);

        // Get the remaining value needed to complete rotation:
        // temp.x + jump.x components compose the positioing in which
        // the currentPosition jumps to the other opposing wall
        // The goal for rotation is to hold the remaining rotation needed
        // to complete a full rotation.
        var rotation = new THREE.Vector3(
            exit.x - (temp.x + jump.x),
            exit.y - (temp.y + jump.y),
            exit.z - (temp.z + jump.z)
        );
        // This step includes the jump to the position coming after the opposing wall,
        // and the next increment to complete the rotation. 
        var step = new THREE.Vector3(
            this.currentPosition.x + jump.x +
            (rotation.x / interval.remainingCubes) +
            (rotation.x % interval.remainingCubes),

            this.currentPosition.y + jump.y +
            (rotation.y / interval.remainingCubes) +
            (rotation.y % interval.remainingCubes),

            this.currentPosition.z + jump.z +
            (rotation.z / interval.remainingCubes) +
            (rotation.z % interval.remainingCubes)
        );
        // This signals that the transitioning from the oppossing walls is completed.
        interval.cubesPriorWall--;
    }
    // Normal condition if there are no interfereing walls on the path:
    else {
        // Calculate the difference in x, y, and z coordinates of the finalPosition
        // and the currentPosition, to get the next step vector towards the finalPosition 
        var step = new THREE.Vector3(
            // make sure you get the quotient and remainder
            ((finalPosition.x - this.currentPosition.x) / interval.remainingCubes) +
            ((finalPosition.x - this.currentPosition.x) % interval.remainingCubes),
            ((finalPosition.y - this.currentPosition.y) / interval.remainingCubes) +
            ((finalPosition.y - this.currentPosition.y) % interval.remainingCubes),
            ((finalPosition.z - this.currentPosition.z) / interval.remainingCubes) +
            ((finalPosition.z - this.currentPosition.z) % interval.remainingCubes)
        );

    }

    // Add the step to the current position and update the currentPosition to this value
    this.currentPosition = new THREE.Vector3(
        this.currentPosition.x + step.x,
        this.currentPosition.y + step.y,
        this.currentPosition.z + step.z
    );
    // Decrement the number of cubes
    interval.remainingCubes--;

    // Check whether the interval instance variable reaminingCubes == 0, and
    // if true, then there are no more frames available to shift the camera
    // to the new position at this interval, so the cube has already
    // shifted to the new Position and the interval is done and doesn't need
    // to be inserted back to the start of the array. Otherwise, it isn't
    // finsihed the translation, so insert it back to the start of the
    // array, using the unshift() method.
    if (interval.remainingCubes != 0) {
        intervals.unshift(interval);
    }

    /////////////////////////////////////////////////////////
    //// Calculate the Look At Position of the Camera ///////
    /////////////////////////////////////////////////////////
    
    // The look at position is 3 cube positions ahead of the snake's head position
    // The head parameter is the leading cube of the snake and the direction is
    // a Three.js vector3
    this.currentLookat = new THREE.Vector3(
        head.mesh.position.x + 3 * (direction.x + Math.sign(direction.x) * 0.15),
        head.mesh.position.y + 3 * (direction.y + Math.sign(direction.y) * 0.15),
        head.mesh.position.z + 3 * (direction.z + Math.sign(direction.z) * 0.15)
    );

    ///////////////////////////////////////////////////////////
    //// Update the camera's position and look at position ////
    ///////////////////////////////////////////////////////////
    this.camera.position.copy(this.currentPosition);
    this.camera.lookAt(this.currentLookat);
};
