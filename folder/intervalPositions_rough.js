IntervalPosition = new function() {
    // The overall number of cubes on a path
    this.remainigCubes;
    // The generic offset for the camera of five different positions
    // relative to some cube
    this.genericOffset;
    // The final position in the interval which the camera must make a
    // full rotation on.
    this.newPosition;

    // When a wall is encountered on the path leading up to
    // change in direction, or just some straigh path, then
    // the camera needs to move toward this position in steps while rototating
    // We still need to head towards the new destination where rotation is fully complete.

    this.wallEntrance = new THREE.Vector3();
    this.wallExit = new THREE.Vector3(); // No add the generic offset to these so we can maintain rotation


    // The above values are default to (0, 0, 0), if the interval path doesn't deal with
    // wall interference.
    // number of cubes preceding the wall collision
    this.cubesPriorWall;

    // From startingCameraPosition to WallEntrance (part of the rotation is completed),
    // then WallExit to newPosition (rotation is completed)
};
// The number of frames is counted, until there is a change in
// direction. This number is originally set to the length of
// the snake for the first interval, but once there is a change in
// direction, that number is set to 0, and increments for every
// call to animate until the next direction is deteced, then that
// number is inistialized to the remainingCubes field of a different
// interval
IntervalPosition.prototype.getNCubes = new function(num) {
    this.remainingCubes = num;
};
// When a change in direction is detected, get the direction, and
// retreieve the corresponding of a generic offset relative to
// some generic center position (0, 0, 0).

IntervalPosition.prototype.getOffset = new function(direction) {
    // direction is a vector3 object
    if (direction.equals((0, 1, 0))) {
        // the dimension of a cube inside the snake array
        // is 2, so (d, d, d) is (2, 2, 2)
        // Snake moves up
        this.genericOffset = new THREE.Vector3(-2, -2, 2);
    } else if (direction.equals((0, -1, 0))) {
        // Snake moves down
        this.genericOffset = new THREE.Vector3(-2, 2, -2);
    } else if (direction.equals((0, 0, -1))) {
        // Snake moves forward
        this.genericOffset = new THREE.Vector3(-2, 2, 2);
    } else if (direction.equals((-1, 0, 0))) {
        // Snake moves left
        this.genericOffset = new THREE.Vector3(2, 2, 2);
    } else if (direction.equals((0, 0, 1))) {
        // Snake moves backward
        this.genericOffset = new THREE.Vector3(2, 2, -2);
    } else if (direction.equals((1, 0, 0))) {
        // snake moves right
        this.genericOffset = new THREE.Vector3(-2, 2, -2);
    }
};
// Get the position of the proceeding cube before the snake's head once the
// turn has been made, then add the generic offset to that position, thus
// getting the nextPostion the camera must translate to in this specific interval
IntervalPosition.prototype.calculateNewPosition = new function(lanePosition) {
    // Get the position of the preceding cube prior the
    // snake's head. The lanePosition is that position vector of
    // that proceeding cube.s

    // lanePosition is a cube object
    this.newPosition = new THREE.Vector3(
        lanePosition.mesh.position.x + genericOffset.x,
        lanePosition.mesh.position.y + genericOffset.y,
        lanePosition.mesh.position.z + genericOffset.z
    );

};
// This gets the cube position prior colliding with the wall
// then adds the generic offset onto it.
IntervalPosition.prototype.getWallEntrance = new function(preHead) {
    this.wallEntrance = new THREE.Vector3(
        preHead.mesh.position.x + genericOffset.x,
        preHead.mesh.position.y + genericOffset.y,
        preHead.mesh.position.z + genericOffset.z

    );
};
// This gets the cube position emerging after the opposing wall
// then adds the generic offset to it.
IntervalPosition.prototype.getWallExit = new function(postHead) {
    this.wallExit = new THREE.Vector3(
        postHead.mesh.position.x + genericOffset.x,
        postHead.mesh.position.y + genericOffset.y,
        postHead.mesh.position.z + genericOffset.z

    );
};
IntervalPosition.prototype.getCubesFromWall = new function(num) {
    this.cubesPriorWall = num;
}
