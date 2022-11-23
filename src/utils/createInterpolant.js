// This is the JS implementation of a monotonic cubic spline from
// https://en.wikipedia.org/wiki/Monotone_cubic_interpolation

// For a good overview of monotonic cubic splines, see
// http://bl.ocks.org/niclasmattsson/7bceb05fba6c71c78d507adae3d29417

// I believe the wikipedia implementation is one of the Fritsch variants
// described in this link.

// D3 uses the improved Steffen variation. Ideally, it would be nice to
// use the Steffen variation, as it would better align to the implementation
// used in most D3-based graphing tools, resulting in smoother lines.

// Unfortunately, it is difficult to extract the math from d3-interpolate.
// Additionally, both d3-interpolate and d3-interpolate-curve libraries cannot
// be used in node because they rely on browser functionality (svg).

// This version is good enough for now. Impact to colors themselves doesn't
// seem all that noticable.

/* Monotone cubic spline interpolation
        Usage example:
        var f = createInterpolant([0, 1, 2, 3, 4], [0, 1, 4, 9, 16]);
        var message = '';
        for (var x = 0; x <= 4; x += 0.5) {
                var xSquared = f(x);
                message += x + ' squared is about ' + xSquared + '\n';
        }
        alert(message);
*/

export const createInterpolant = function(xs, ys) {
    var i, length = xs.length;

    // Deal with length issues
    if (length !== ys.length) { throw Error('Need an equal count of xs and ys.'); }
    if (length === 0) { return function() { return 0; }; }
    if (length === 1) {
            // Impl: Precomputing the result prevents problems if ys is mutated later and allows garbage collection of ys
            // Impl: Unary plus properly converts values to numbers
            var result = +ys[0];
            return function() { return result; };
    }

    // Rearrange xs and ys so that xs is sorted
    let indexes = [];
    for (i = 0; i < length; i++) { indexes.push(i); }
    indexes.sort(function(a, b) { return xs[a] < xs[b] ? -1 : 1; });
    const oldXs = xs, oldYs = ys;
    // Impl: Creating new arrays also prevents problems if the input arrays are mutated later
    xs = []; ys = [];
    // Impl: Unary plus properly converts values to numbers
    for (i = 0; i < length; i++) { xs.push(+oldXs[indexes[i]]); ys.push(+oldYs[indexes[i]]); }

    // Get consecutive differences and slopes
    var dys = [], dxs = [], ms = [];
    for (i = 0; i < length - 1; i++) {
            var dx = xs[i + 1] - xs[i], dy = ys[i + 1] - ys[i];
            dxs.push(dx); dys.push(dy); ms.push(dy/dx);
    }

    // Get degree-1 coefficients
    var c1s = [ms[0]];
    for (i = 0; i < dxs.length - 1; i++) {
            var m = ms[i], mNext = ms[i + 1];
            if (m*mNext <= 0) {
                    c1s.push(0);
            } else {
                    var dx_ = dxs[i], dxNext = dxs[i + 1], common = dx_ + dxNext;
                    c1s.push(3*common/((common + dxNext)/m + (common + dx_)/mNext));
            }
    }
    c1s.push(ms[ms.length - 1]);

    // Get degree-2 and degree-3 coefficients
    var c2s = [], c3s = [];
    for (i = 0; i < c1s.length - 1; i++) {
            var c1 = c1s[i], m_ = ms[i], invDx = 1/dxs[i], common_ = c1 + c1s[i + 1] - m_ - m_;
            c2s.push((m_ - c1 - common_)*invDx); c3s.push(common_*invDx*invDx);
    }

    // Return interpolant function
    return function(x) {
            // The rightmost point in the dataset should give an exact result
            var i = xs.length - 1;
            if (x === xs[i]) { return ys[i]; }

            // Search for the interval x is in, returning the corresponding y if x is one of the original xs
            var low = 0, mid, high = c3s.length - 1;
            while (low <= high) {
                    mid = Math.floor(0.5*(low + high));
                    var xHere = xs[mid];
                    if (xHere < x) { low = mid + 1; }
                    else if (xHere > x) { high = mid - 1; }
                    else { return ys[mid]; }
            }
            i = Math.max(0, high);

            // Interpolate
            var diff = x - xs[i], diffSq = diff*diff;
            return ys[i] + c1s[i]*diff + c2s[i]*diffSq + c3s[i]*diff*diffSq;
    };
};


export default createInterpolant;