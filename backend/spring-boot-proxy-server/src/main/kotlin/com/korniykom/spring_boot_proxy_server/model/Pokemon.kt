data class Pokemon(
    val id: Int,
    val name: String,
    val habitat: String?,
    val sprites: Sprites?,
    val moves: List<Moves>?
)

data class Moves(
    val move: Move
)

data class Move(
    val name: String
)

data class Sprites(
    val front_default: String?
)
