IntervalPosition = new function() {
    // The overall number of cubes on a path
    this.remainingCubes; // (Integer)
    // The generic offset for the camera of five different positions
    // relative to some cube
    this.genericOffset; // (Vector)
    // The final position in the interval which the camera must make a
    // full rotation on.
    this.newPosition;  // (Vector)

    // position of camera if wall is encountered
    this.wallEntrance = new THREE.Vector3();
    // position of camera after emerging from a wall opposiong the collision
    this.wallExit = new THREE.Vector3();
    // number of cubes preceding the wall collision
    this.cubesPriorWall; // Integer
};

// The number of frames is counted, until there is a change in
// direction.
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
    // lanePosition is a cube object that precedes the updated head.
    this.newPosition = new THREE.Vector3(
        lanePosition.mesh.position.x + genericOffset.x,
        lanePosition.mesh.position.y + genericOffset.y,
        lanePosition.mesh.position.z + genericOffset.z
    );

};
// This gets the cube position prior colliding with the wall
// then adds the generic offset onto it.
IntervalPosition.prototype.getWallEntrance = new function(preHead) {
    // preHead is the cube preceding the reposition head upon collision
    this.wallEntrance = new THREE.Vector3(
        preHead.mesh.position.x + genericOffset.x,
        preHead.mesh.position.y + genericOffset.y,
        preHead.mesh.position.z + genericOffset.z

    );
};
// This gets the cube position emerging after the opposing wall
// then adds the generic offset to it.
IntervalPosition.prototype.getWallExit = new function(postHead) {
    // postHead is the repositioned head cube after collison. 
    this.wallExit = new THREE.Vector3(
        postHead.mesh.position.x + genericOffset.x,
        postHead.mesh.position.y + genericOffset.y,
        postHead.mesh.position.z + genericOffset.z

    );
};
IntervalPosition.prototype.getCubesFromWall = new function(num) {
    this.cubesPriorWall = num;
}
